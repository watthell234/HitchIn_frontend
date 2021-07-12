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

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 40.8509;
const LONGITUDE = -73.97014;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let socket;
let userID;

export default class RiderPositionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip_started: false,
      polyline_coordinates: [],
      marker: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      map_region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      travel_distance: 0,
      prevLatLng: {},
      passenger_list: []
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

  componentWillUnmount() {

  }

  async setupWebsocket(){
    let tripID;
    let driver;
    try{
      userID = this.props.navigation.getParam('userID', null);
      socket = this.props.navigation.getParam('socket', null);
      tripID = this.props.navigation.getParam('tripID', null);
      driver = this.props.navigation.getParam('driver', null);
    }catch(error){
      console.log("could not retrieve information fron asyncstorage.", error);
    }

    console.log(driver);

    socket.emit('init_passenger_list', {tripID: tripID});

    //how are we getting the driver?
    socket.on('passenger_list', (response) => {
      console.log(response.passenger_list);
    })

    //Need to make sure this actually works. Gonna need 3 phones. damn.
    socket.on('passenger_update', (response) => {
      console.log(response.passenger_list);
    })

    socket.on('start_trip', () => {
      this.setState({
        trip_started: true
      })
    })

    socket.on('trip_deleted', async () => {
      await this.watchID.remove();
      socket.disconnect();
      if(trip_started){
        this.props.navigation.navigate('EndTrip');
      }else{
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'QRReader'})], 0);
      }
    })
  }

  async getPermission() {
    let { status } = await Location.requestPermissionsAsync();
    if(status === 'granted') {
      this.getLocation();
    }else{
      console.log('Permission access was denied');
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
    //
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

  async handle_cancel_trip() {
    await this.watchID.remove();
    socket.emit('leave_trip', {userID: userID});
    socket.on('passenger_update', (response) => {
      console.log(response.passenger_list);
    })
    socket.disconnect();
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'QRReader'})], 0);
  }

  handle_safety_toolkit(){

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

    let driver = this.props.navigation.getParam('driver', null);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          minZoomLevel={15}
          zoomControlEnabled={true}
          region={this.state.map_region}
          onRegionChange={(map_region) => this._handleMapRegionChange(map_region)}>
          <Polyline coordinates={this.state.polyline_coordinates} strokeWidth={5} />
          <Marker
            coordinate={this.state.marker}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.travel_distance).toFixed(2)} mile
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
            data={[
              {key: driver},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
          {this.state.trip_started ?
            <TouchableOpacity
              style={styles.button}
              onPress={() => {this.handle_safety_toolkit()}}>
              <Text style={{color: "#FFFFFF", fontSize:20}}>Safety Toolkit</Text>
          </TouchableOpacity>
        : <TouchableOpacity
          style={styles.button}
          onPress={() => {this.handle_cancel_trip()}}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Cancel Trip</Text>
      </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
  width: 350,
  height: 500,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
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
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
