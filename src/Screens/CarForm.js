import React from 'react';
import { Text, View, Button, TextInput, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import { http, getAxios } from './constants/hitchBackendapi';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';


export default class CarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            carMake: null,
            carColor: null,
            carYear: null,
            licensePlate: null,
            ezpassTag: null,
            token: null,
            majorCarBrands: require('./constants/car_makers'),

        }
        this.handleMakeChange = this.handleMakeChange.bind(this);
    }

    handleMakeChange(carMake) {
        this.setState({carMake})
    }



    componentDidMount() {
      this.getToken();
      // let majorCarBrands = [];
      // fetch('https://raw.githubusercontent.com/watthell234/car_makers/main/car_makers')
      // .then(response => response.json()).then(data => this.setState({majorCarBrands: data}));
    }

    async getToken(user, token) {
      try {
        let getUserId = await AsyncStorage.getItem("userId");
        let userId = JSON.parse(getUserId);
        let getToken = await AsyncStorage.getItem("authToken");
        let token = JSON.parse(getToken);
        console.log(token);
        this.setState({userId: userId});
        this.setState({token: token})
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    async storeCarId(carId) {
      try {
        await AsyncStorage.setItem("carId", JSON.stringify(carId));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    onCreateQR() {
        const {userId, carCreate, carMake, carColor, carYear, licensePlate, ezpassTag, token} = this.state;
        console.log(token);
        if (!carCreate) {
            getAxios(token).post('/car', {userId, carMake, carColor, carYear, licensePlate, ezpassTag})
            .then((response) => this.storeCarId(response.data.id))
            .then(() => this.setState({carCreate: true}))
            .then(() => this.props.navigation.navigate('Pairing'))
            .catch((err) => console.log(err))
        }
    }
    render() {
        const {carCreate, majorCarBrands} = this.state;
        const placeholder = {
                              label: 'Select Car Brand',
                              value: null,
                              color: 'gray',
                            };
        return (
          <View style={styles.container}>
              <View>
                  <Text style={styles.title}
                      category='h1'>Car Info</Text>
                  <RNPickerSelect
                        style={{
                          ...pickerSelectStyles,
                          iconContainer: {
                          top: 10,
                          right: 12,
                        },
                      }}
                        placeholder={placeholder}
                        onValueChange={(value) => console.log(majorCarBrands)}
                        items={this.state.majorCarBrands}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={this.handleMakeChange}
                      placeholder="Car Make"
                      value={this.state.carMake}
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(carColor) => this.setState({carColor})}
                      value={this.state.carColor}
                      placeholder="Car Color"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(carYear) => this.setState({carYear})}
                      value={this.state.carYear}
                      placeholder="Car Year"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(licensePlate) => this.setState({licensePlate})}
                      value={this.state.licensePlate}
                      placeholder="License Plate"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(ezpassTag) => this.setState({ezpassTag})}
                      value={this.state.ezpassTag}
                      placeholder="EZ-Pass Tag"
                      onBlur={Keyboard.dismiss}
                  />
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.onCreateQR()}}>
                      <Text style={{color: "#FFFFFF", fontSize:20}}>Create QR Code</Text>
                  </TouchableOpacity>
                  <Text> Car Creation: {carCreate ? 'Successful' : 'Fail'}</Text>
              </View>
          </View>
        );

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
    textDecorationColor: 'white'
  },
});
