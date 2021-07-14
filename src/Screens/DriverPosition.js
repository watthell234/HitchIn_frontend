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
      map_region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      travel_distance: 0,
      prevLatLng: {}
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
    tripID = this.props.navigation.getParam('tripID', null);
    pickup = this.props.navigation.getParam('pickup', null);
    dropoff = this.props.navigation.getParam('dropoff', null);

    socket = this.props.navigation.getParam('socket', null);
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

  async handle_end_trip() {
    await this.watchID.remove();
    console.log(tripID);
    console.log(pickup);
    console.log(dropoff);
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
              {key: 'Devin'},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
        <TouchableOpacity
            style={styles.button}
            onPress={() => {this.handle_end_trip()}}>
            <Text style={{color: "#FFFFFF", fontSize:20}}>End Trip</Text>
        </TouchableOpacity>
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
