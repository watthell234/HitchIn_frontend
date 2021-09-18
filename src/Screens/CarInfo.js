import React from 'react';
import { StyleSheet, Text, View, Button,
  TextInput, Image, ImageBackground, Keyboard,
  TouchableOpacity, ScrollView
} from 'react-native';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http_jwt } from './constants/hitchBackendapi';
import {majorCarBrands} from './constants/car_makers';
import RNPickerSelect from 'react-native-picker-select';
import LogOut from '../Buttons/LogOut.js';

export default class CarInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      clicked: false
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
      await AsyncStorage.setItem("carID", JSON.stringify(carID));
    }catch(error) {
      console.log("something went wrong", error)
    }
  }

  async handleSubmit() {
    this.setState({
      clicked: true
    })
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
        this.props.navigation.navigate('DriverTrip');
      })
      .catch((error) => {
        this.setState({
          clicked: false
        })
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
    const placeholder = {
                          label: 'Select Car Brand',
                          value: null,
                          color: 'gray',
                        };
    return (

      <View style={styles.container}>
        <LogOut navigation={this.props.navigation}/>

        <View>
            <Text style={styles.title} category='h1'>Car Info</Text>
            <RNPickerSelect
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                  placeholder={placeholder}
                  onValueChange={(value) => this.handleTextChange("car_maker", value)}
                  items={majorCarBrands}
                  useNativeAndroidPickerStyle={false}
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
            {this.state.clicked ?
              <TouchableOpacity
                style={styles.button}
                disabled={true}>
                <Text style={{color: "#FFFFFF"}}>Creating QR Code...</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmit()}>
                <Text style={{color: "#FFFFFF"}}>Create QR Code</Text>
              </TouchableOpacity>}
        </View>
      </View>

    )
  }
}

const pickerSelectStyles = StyleSheet.create({
inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    // textColor: 'gray',
    backgroundColor: 'white',
    textDecorationColor: 'white'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white'
  }
});
