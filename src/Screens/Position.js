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

export default class Position extends Component {
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
    //
    // this.show_location = this.show_location.bind(this);
    // this.error_handler = this.error_handler.bind(this);

  }

  componentDidMount() {

    // this.setupWebsocket();
    this.getPermission();
  }

  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

  async getPermission() {
    let { status } = await Location.requestPermissionsAsync();
    if(status === 'granted') {
      this.getLocation();
    }else{
      console.log('Permission access was denied');
    }
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

    console.log(polyline_coordinates);

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
      polyline_coordinates
    })
  }

  error_handler(err) {
    if(err.code == 1) {
      alert("Error: Access is denied!");
    } else if( err.code == 2) {
      alert("Error: Position is unavailable!");
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
  async handle_end_trip() {
    // socket.emit('leave', {userID: userID});
    // socket.disconnect();
    // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'QRReader'})], 0);
    await this.watchID.remove();
    this.props.navigation.navigate('LoggedIn');
  }

  async setupWebsocket(){
    userID = await AsyncStorage.getItem('userID');

    socket = this.props.navigation.getParam('socket', null);

    socket.on('trip_deleted', ()=> {
      socket.disconnect();
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'QRReader'})], 0);
    })
  }

  _handleMapRegionChange(map_region){
    this.setState({ map_region });
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
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
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
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
