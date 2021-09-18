import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { http } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {styles} from './styles/styles';

let socket;
let pickup;
let dropoff;
let tripID;

export default class PairingScreen extends React.Component {
  constructor(props) {
      super (props);
      this.state = {
        driver: '',
        passengerCount: 1,
        passenger_list: []
      }
  }

  componentDidMount() {
    this.setup_pool();
  }

  componentWillUnmount() {
    socket.emit('delete_trip', {tripID: tripID, pickup: pickup, dropoff: dropoff});
    socket.disconnect();
  }

  async setup_pool() {

    let userID;
    let carID;

    try{
      userID = await AsyncStorage.getItem("userID");
      carID = await AsyncStorage.getItem("carID");
      pickup = await AsyncStorage.getItem("pickup");
      dropoff = await AsyncStorage.getItem("dropoff");

    }catch(error){
      console.log("could not retrieve information fron asyncstorage.", error);
    }

    socket = io("wss://hitchin-server.herokuapp.com/");

    // You automatically create a room named <sid> when you connect,
    // and you automatically join the room.
    // *SO THE DRIVER DOES NOT HAVE TO SCAN.
    socket.on('room_ID', (response) => {
      // console.log("room ID: " + response.sid);
      socket.emit('register_trip', {carID: carID, userID: userID, pickup: pickup, dropoff: dropoff, session_id: response.sid});
    });

    socket.on('trip_id_' + carID, (response) => {
      tripID = response.trip_id;
      this.setState({
        driver: response.driver_name
      })
    })

    socket.on('passenger_update', (response) => {

      let passenger_count = this.state.passengerCount;
      let passenger_list = this.state.passenger_list;

      if(response.action == 'add') {
        passenger_count += 1;
      }else{
        passenger_count -= 1;
      }

      // console.log(response.passenger_list);

      this.setState({
        passengerCount: passenger_count,
        passenger_list: response.passenger_list
      })
    })

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

  async handle_start_trip() {

    socket.emit('start_trip', {tripID: tripID, pickup: pickup, dropoff: dropoff});
    this.props.navigation.navigate('DriverPosition', {socket: socket, tripID: tripID, pickup: pickup, dropoff: dropoff, passenger_list: this.state.passenger_list, driver: this.state.driver});

    //   try {
    //     let passengerCount = await this.getPassCount();
    //     console.log(passengerCount);
    //     if (3 >= 0) {
    //       this.props.navigation.navigate('Position');
    //     }
    //     else { Alert.alert("Insufficient Passengers",
    //     "You have " + passengerCount.toString() + " passenger(s) you need 3 to carpool",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ],      { cancelable: false }
    //   );
    // }
    // } catch (error) {
    //   console.log('Something went wrong'+ error)
    // }
  }

  cancelTrip(){
    // console.log("tripID: " + tripID);
    // console.log(pickup);
    socket.emit('delete_trip', {tripID: tripID, pickup: pickup, dropoff: dropoff});
    socket.disconnect();
    this.props.navigation.navigate('CarList');
  }

  render() {
    let passenger_list = this.state.passenger_list;
    let list_str = "Passenger list: " + '\n';
    let passenger_info = '';

    list_str = 'Driver: ' + this.state.driver + '\n';
    passenger_list.forEach((value, index) => {
      passenger_info = "Passenger: " + value.passenger_name;
      list_str = list_str + passenger_info + '\n';
    })

    return (
      <View style={styles.container}>
        <Text>HitchIn</Text>
        <Text>Carpool Ready? {this.state.passengerCount} (including driver)</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.handle_start_trip()}}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Start Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.cancelTrip()}}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Cancel Trip</Text>
        </TouchableOpacity>
        <Text>{list_str}</Text>
      </View>
    )
  }
}
