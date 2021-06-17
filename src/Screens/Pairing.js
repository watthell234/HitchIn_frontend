import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { http } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

let socket;

export default class PairingScreen extends React.Component {
  constructor(props) {
      super (props);
      this.state = {
        passengerCount: null,
      }
  }

  // componentDidMount() {
  //   this.getCarId();
  // }

  componentDidMount() {

    this.setup_pool();

  }

  async setup_pool() {

    let userID;
    let carID;
    let pickup;
    let dropoff;
    try{

      userID = await AsyncStorage.getItem("userID");
      carID = await AsyncStorage.getItem("carID");
      pickup = await AsyncStorage.getItem("pickup");
      dropoff = await AsyncStorage.getItem("dropoff");

    }catch(error){
      console.log("something went wrong", error)
    }

    console.log(carID);
    console.log(userID);
    console.log(pickup);
    console.log(dropoff);

    socket = io("wss://hitchin-server.herokuapp.com/");

    // You automatically create a room named <sid> when you connect,
    // and you automatically join the room.
    // *SO THE DRIVER DOES NOT HAVE TO SCAN.
    socket.on('room_ID', (response) => {
      console.log("room ID: " + response.sid);
    });

    socket.emit('register_trip', {carID: carID, userID: userID, pickup: pickup, dropoff: dropoff});

    // socket.on('trip_updated', (trip_list) => {
    //   console.log(trip_list);
    // })

  }

  async getCarId() {
    try {
      let carData = await AsyncStorage.getItem("carId");
      let data = JSON.parse(carData);
      console.log(data);
      return data
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

 async getPassCount() {
    try {
    const carId = await this.getCarId();
    const response = await http.get('/pooltrips/' + carId);
    console.log("Riders Checked in:" , response.data.slugs);
    return response.data.slugs
    } catch (error) {
      console.log("Something went wrong", error);
    }
}

async onPress() {
  try {
    let passengerCount = await this.getPassCount();
    console.log(passengerCount);
    if (3 >= 0) {
      this.props.navigation.navigate('Position');
    }
    else { Alert.alert("Insufficient Passengers",
    "You have " + passengerCount.toString() + " passenger(s) you need 3 to carpool",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],      { cancelable: false }
  );
}
} catch (error) {
  console.log('Something went wrong'+ error)
}
}

goHome(){
  socket.disconnect();
  this.props.navigation.navigate('LoggedIn');
}

    render() {
        return (
            <View style={styles.container}>
              <Text>HitchIn</Text>
                <Text>Carpool Ready?</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.onPress()}}>
                    <Text style={{color: "#FFFFFF", fontSize:20}}>Start Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.goHome()}}>
                    <Text style={{color: "#FFFFFF", fontSize:20}}>Home</Text>
                </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AAB7BD',
        alignItems: 'center',
  },
    button: {
      alignItems: "center",
      backgroundColor: "#404e5a",
      padding: 10,
      width: 250,
    },

     }
)
