import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// const LOCATION_SETTINGS = {
//   accuracy: Location.Accuracy.Balanced,
//   timeInterval: 400,
//   distanceInterval: 0,
// };
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

export default class Position2 extends Component {
    constructor(props) {
      super(props);

      this.state = {
        latitude: 0,
        longitude: 0,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0
      }),
      mapRegion: null,
      };
    }

    async componentDidMount() {

        let location = await Location.getCurrentPositionAsync({});
        this.setState( {
            coordinate: location.coords
        }
    )
    this.setState({ mapRegion: {
        latitude: this.state.coordinate.latitude,
        longitude: this.state.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    } });


    Location.watchPositionAsync({
        distanceInterval: 0,
        timeInterval: 200,},
        location => {

        const { routeCoordinates } = this.state;
        const {latitude, longitude} = location.coords;
        const newCoordinate = { latitude, longitude };
        console.log(newCoordinate);

        this.setState({latitude, longitude, routeCoordinates: routeCoordinates.concat([newCoordinate])});
    } );
        // this.setState({routeCoordinates: location.coords}));



//     this.watchID = Location.watchPositionAsync(
//         location => {
//         const { routeCoordinates, distanceTravelled } = this.state;
//         const { latitude, longitude } = location.coords;
//
//         const newCoordinate = {
//           latitude,
//           longitude
//         };
//         console.log({ newCoordinate });
//
//         if (Platform.OS === "android") {
//           if (this.marker) {
//             this.marker._component.animateMarkerToCoordinate(
//               newCoordinate,
//               500
//             );
//           }
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }
//
//         this.setState({
//           latitude,
//           longitude,
//           routeCoordinates: routeCoordinates.concat([newCoordinate]),
//           distanceTravelled:
//             distanceTravelled + this.calcDistance(newCoordinate),
//           prevLatLng: newCoordinate
//         }
//     );
//
// },

}


  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  requestLocationPermission = async () => {
  Location.requestPermissionsAsync();

  if (status !== 'granted') {
      console.log('PERMISSION to spy DENIED!');

      this.setState({
          errorMessage: 'PERMISSION not granted'
      })
  }
}

    handleMapRegionChange (mapRegion){
        console.log(mapRegion);
        this.setState({ mapRegion });
    }

    render() {
        return(
            <View style={styles.container}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={this.state.mapRegion}
              >
                <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                <Marker.Animated
                  ref={marker => {
                    this.marker = marker;
                  }}
                  coordinate={this.state.coordinate}
                >
                  <Image
                    source={require("./assets/car.png")}
                    style={{ height: 35, width: 35 }}
                  />
                </Marker.Animated>
              </MapView>
              <View style={styles.buttonContainer}>
                <Text style={styles.bottomBarContent}>
                  {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                </Text>
              </View>
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
      width: 300,
      height: 300,
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
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});
