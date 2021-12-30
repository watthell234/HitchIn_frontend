import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import { NavigationActions } from 'react-navigation';
import haversine from "haversine";
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 40.8509;
const LONGITUDE = -73.97014;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let socket;
let tripID;
let pickup;
let dropoff;

export default class DriverPositionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polyline_coordinates: [],
      marker: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      destination_marker: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      map_region: null,
      travel_distance: 0,
      prevLatLng: {},
      passengers: {
        driver: null,
        passenger_list: null
      }
      // routeCoordinates: [],
      // distanceTravelled: 0,
      // prevLatLng: {},
      // marker:[],
      // coordinate: new AnimatedRegion({
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      //   dataFromServer: "null",
      // })
    };

  }

  componentDidMount() {

    this.setupWebsocket();
    this.getPermission();
  }

  async componentWillUnmount() {
    await this.watchID.remove();
    socket.emit('delete_trip', {tripID: tripID, pickup: pickup, dropoff: dropoff});
    socket.disconnect();
  }

  async setupWebsocket(){

    let pickup_latitude;
    let pickup_longitude;
    let dropoff_latitude;
    let dropoff_longitude;
    let passenger_list;
    let driver;

    try{
      tripID = this.props.navigation.getParam('tripID', null);
      socket = this.props.navigation.getParam('socket', null);

      pickup = this.props.navigation.getParam('pickup', null);
      pickup_latitude = await AsyncStorage.getItem("pickup_latitude");
      pickup_longitude = await AsyncStorage.getItem("pickup_longitude");

      dropoff = this.props.navigation.getParam('dropoff', null);
      dropoff_latitude = await AsyncStorage.getItem("dropoff_latitude");
      dropoff_longitude = await AsyncStorage.getItem("dropoff_longitude");

      passenger_list = this.props.navigation.getParam('passenger_list', null);
      driver = this.props.navigation.getParam('driver', null);
    }catch(error){
      console.log("could not retrieve information fron asyncstorage.", error);
    }

    dropoff_latitude = parseFloat(dropoff_latitude);
    dropoff_longitude = parseFloat(dropoff_longitude);

    this.setState({
      passengers: {
        driver: driver,
        passenger_list: passenger_list
      },
      destination_marker: {
        latitude: dropoff_latitude,
        longitude: dropoff_longitude
      }
    })

  }

  async getPermission() {
    if (Platform.OS === "ios") {
      let { status } = await requestTrackingPermissionsAsync();
      let { permStatus } = await Location.requestForegroundPermissionsAsync();
        if( status === 'granted') {
          this.getLocation();
        }else{
          console.log('Permission access was denied');
        }
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
        if( status === 'granted') {
          this.getLocation();
        }else{
          console.log('Permission access was denied');
        }
    }


  }

  async getLocation() {

    let options = {
      accuracy: Location.Accuracy.High,
      timeInterval: 2000,
      distanceInterval: 1
    };

    this.watchID = await Location.watchPositionAsync(options,
      (position) => this.show_location(position));

  }

  show_location(position) {

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // console.log("-------------------");
    // console.log(latitude);
    // console.log(longitude);
    // console.log("-------------------");

    // if (Platform.OS === "android") {
    //   if (this.marker) {
    //     this.marker._component.animateMarkerToCoordinate(
    //       newCoordinate,
    //       0
    //     );
    //   }
    // } else {
    //   coordinate.timing(newCoordinate).start();
    // }
    let polyline_coordinates = this.state.polyline_coordinates.concat({latitude: latitude, longitude: longitude});
    let travel_distance = this.state.travel_distance + this.calculate_distance({latitude, longitude});

    this.setState({
      map_region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      marker: {
        latitude: latitude,
        longitude: longitude
      },
      polyline_coordinates,
      travel_distance,
      prevLatLng:{latitude, longitude}
    })
  }

  error_handler(err) {
    if(err.code == 1) {
      alert("Error: Access is denied!");
    } else if( err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }

  async handle_end_trip() {
    await this.watchID.remove();
    socket.emit('delete_trip', {tripID: tripID, pickup: pickup, dropoff: dropoff});
    socket.disconnect();
    this.props.navigation.navigate('EndTrip');
  }

  _handleMapRegionChange(map_region){
    this.setState({ map_region });
  }

  calculate_distance(newLatLng){
    const { prevLatLng } = this.state;
    let distance = haversine(prevLatLng, newLatLng, {unit: 'mile'}) || 0;
    return distance;
  };

  render() {

    return (
      <View style={styles.container}>
        {this.state.map_region ? <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          minZoomLevel={14}
          initialRegion={this.state.map_region}
          onRegionChange={(map_region) => this._handleMapRegionChange(map_region)}>
          <Polyline coordinates={this.state.polyline_coordinates} strokeWidth={5} />
          <Marker
            coordinate={this.state.marker}
          />
          <Marker
            coordinate={this.state.destination_marker}
          />
        </MapView> : <Text style={styles.map}> Loading Map... </Text>}
        <View style={styles.distance_container}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.distance_text}>
              {parseFloat(this.state.travel_distance).toFixed(2)} mile
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.item}>Driver: {this.state.passengers.driver}</Text>
        <View style={styles.list_container}>
          <FlatList
              data={this.state.passengers.passenger_list}
              renderItem={({item}) => <Text style={styles.item}>{item.passenger_name}</Text>}
              keyExtractor={item => String(item.passenger_id)}
          />
        </View>
        <View style={styles.button_container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {this.handle_end_trip()}}>
            <Text style={styles.button_text}>End Trip</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    flex: 7,
    width: screen.width,
    height: screen.height,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 15
  },
  list_container: {
    flex: 1
  },
  button_container: {
    flex: 1
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#404e5a",
    padding: 10,
    width: 250,
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 20
  },
  distance_container: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "transparent"
  },
  distance_text: {
    color: "#FFFFFF",
    fontSize: 20
  },
  item: {
    fontSize: 18,
    height: 30,
  }
});
