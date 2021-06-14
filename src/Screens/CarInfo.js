import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http_jwt } from './constants/hitchBackendapi';
import LogOut from '../Buttons/LogOut.js';

export default class CarInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
    }
  };

  handleTextChange(name, value){
    let input = this.state.input;
    input[name] = value;

    this.setState({
      input
    });
  }

  async storeCarID(carID) {
    try{
      await AsyncStorage.setItem("carID", carID);
    }catch(error) {
      console.log("something went wrong", error)
    }
  }

  async handleSubmit() {
    const {car_maker, car_color, car_year, car_plate, ezpass_tag} = this.state.input;
    let userID;
    let token;
    let carID;

    try {
      userID = await AsyncStorage.getItem("userID");
      token = await AsyncStorage.getItem("authToken");

      userID = JSON.parse(userID);
      token = JSON.parse(token);
    }catch(error){
      console.log("Something went wrong", error)
    }

    if(userID && token){
      http_jwt(token).post('/create_car', {userID, car_maker, car_color, car_year, car_plate, ezpass_tag})
      .then((response) => {
        carID = response.data.car_id;
        this.storeCarID(carID);
        console.log("qr_id: " + response.data.qr_id);
        this.props.navigation.navigate('QRReader', {'action': 'drive', 'userID': userID, 'carID': carID});
      })
      .catch((error) => {
        console.log("Could not post '/car'", error)
      })
    }

  }

  //Needs to be implemented later
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;


  }


  render() {
    return (
      <View style={styles.container}>
        <LogOut navigation={this.props.navigation}/>
        <View>
            <Text style={styles.title} category='h1'>Car Info</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_maker", value)}
                placeholder="Car Maker"
                value={this.state.input.car_maker}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_color", value)}
                placeholder="Car Color"
                value={this.state.input.car_color}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_year", value)}
                placeholder="Car Year"
                value={this.state.input.car_year}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_plate", value)}
                placeholder="License Plate"
                value={this.state.input.car_plate}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("ezpass_tag", value)}
                placeholder="EZ-pass Tag"
                value={this.state.input.ezpass_tag}
                onBlur={Keyboard.dismiss}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmit()}>
                <Text style={{color: "#FFFFFF"}}>Create QR Code</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}