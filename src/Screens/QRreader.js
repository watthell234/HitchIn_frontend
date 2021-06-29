import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import io from 'socket.io-client';
import { http } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window')
const qrSize = width * 0.7

let socket;
let pickup;
let dropoff;
let userID;

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}

export default class QRReaderScreen extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      hasPermission: null,
      scanned: false,
      car_list: []
    }
  }

  componentDidMount() {
    this.join_pool();
  }

  async join_pool(){


    try{
      userID = await AsyncStorage.getItem("userID");
      pickup = await AsyncStorage.getItem("pickup");
      dropoff = await AsyncStorage.getItem("dropoff");
    }catch(error){
      console.log("could not retrieve information fron asyncstorage.", error);
    }

    this.getPermission();

    socket = io("wss://hitchin-server.herokuapp.com/");

    socket.on('room_ID', (response) => {
      // console.log("room ID: " + response.sid);
    });

    socket.emit('init_ride', {pickup: pickup, dropoff: dropoff});

    socket.on('car_list_' + pickup.replace(" ", "_"), (data) => {
      this.setState({
        car_list: data.car_list
      })
    })

    socket.on('updated_car_list_' + pickup.replace(" ", "_"), (data) => {
      // console.log("CAR LIST:");
      // console.log(data.car_list);
      // console.log("------------------");
      this.setState({
        car_list: data.car_list
      })
    })

  }

  async getPermission() {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({
        hasPermission: status == 'granted'
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  handleBarCodeScanned = async ({ type, data }) => {

    await delay(500);
    if (this.state.scanned) return;

    // console.log(userID);
    // console.log(data);
    socket.emit('join_trip', {qr_string: data, userID: userID});

    socket.on('join_trip_response_' + userID, (response) => {
      if(response.success == 1) {
        this.setState({
          scanned: true
        })
        this.props.navigation.navigate('RiderPosition', {socket: socket, userID: userID});
      }else{

      }
    })

    // let userId = this.state.userId
    // console.log(data)
    // data = JSON.parse(data)
    // // alert(`Bar code with type ${type} and Car QR: ${data.car_qr} has been scanned!`);
    // let carQr = data.car_qr
    // // TODO: test this message
    // this.joinPoolEvent(userId, carQr);
    // http.post('/checkin', { userId, carQr})
    // .then(() => this.props.navigation.navigate('Position'))
    // .catch((err) => console.log(err))

  };

    // joinPoolEvent =  (userId, poolId) => {
    //
    //   socket.emit("join", {username: userId, pool_id: poolId});
    //
    // }



  render() {

    const { hasPermission, scanned } = this.state;
    let car_list = this.state.car_list;

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    let list_str = "Cars waiting at " + pickup + ":\n";
    let car_info = "";
    car_list.forEach((value, index) => {
      // console.log(value);
      let temp_index = index + 1;
      car_info = "Car " + temp_index + ": " + value.car_maker + ", " + value.license_plate;
      list_str = list_str + car_info + "\n";
    })

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text style={styles.description}>{list_str}</Text>
        <Image
          style={styles.qr}
          source={require('./assets/qr-scanner.png')}
        />
        <Text
          onPress={() => {
            socket.disconnect();
            this.props.navigation.navigate('LoggedIn');
          }}
          style={styles.cancel}> Cancel </Text>
      </BarCodeScanner>
      </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
    },
    qr: {
      marginTop: '20%',
      marginBottom: '20%',
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.05,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    cancel: {
      fontSize: width * 0.05,
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#404e5a",
        padding: 10,
        width: 250,
     },
});
