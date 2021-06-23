import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image,
  FlatList
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

let socket;

export default class Position extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
        dataFromServer: "null",
      })
    };
  }


  async handle_end_trip() {
    let userID = await AsyncStorage.getItem('userID');
    socket.emit('leave', {userID: userID});
    this.props.navigation.pop();
  }

  setupWebsocket = () => {
    this.socket = io("https://hitchin-server.herokuapp.com/");

     this.socket.on("my_response", (r) => {
       console.log(this.socket.connected);
       console.log(r.data);
     });


     this.socket.on("event", (e) => {
       console.log(e.data);
       this.setState({dataFromServer: e.data});
       this.props.navigation.navigate('EndTrip');
     });

     this.socket.on("roomjoin", (e) => {
       console.log(e.data);
       //TODO: add something to asyncstorage

     });

  }

componentDidMount() {
  // this.setupWebsocket();

  socket = this.props.navigation.getParam('socket', null);

  // socket.on('connect', () => {
  //   console.log(socket.connected);
  // });
  //
  // const { coordinate } = this.state;
  //
  // this.watchID = navigator.geolocation.watchPosition(
  //   position => {
  //     const { routeCoordinates, distanceTravelled } = this.state;
  //     const { latitude, longitude } = position.coords;
  //
  //     const newCoordinate = {
  //       latitude,
  //       longitude
  //     };
  //
  //     if (Platform.OS === "android") {
  //       if (this.marker) {
  //         this.marker._component.animateMarkerToCoordinate(
  //           newCoordinate,
  //           0
  //         );
  //       }
  //     } else {
  //       coordinate.timing(newCoordinate).start();
  //     }
  //
  //     this.setState({
  //       latitude,
  //       longitude,
  //       routeCoordinates: routeCoordinates.concat([newCoordinate]),
  //       distanceTravelled:
  //         distanceTravelled + this.calcDistance(newCoordinate),
  //       prevLatLng: newCoordinate
  //     });
  //   },
  //   error => console.log(error),
  //   {
  //     enableHighAccuracy: true,
  //     timeout: 20000,
  //     maximumAge: 1000,
  //     distanceFilter: 10
  //   }
  // );
}

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

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

          region={this.getMapRegion()} >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <Image
              source={require("./assets/car.png")}
              style={{ height: 35, width: 35 }}
            />
          </Marker.Animated>
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
