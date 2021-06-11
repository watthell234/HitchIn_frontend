import React from 'react';
import { Text, View, Button, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import { http, getAxios } from './constants/hitchBackendapi';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
            majorCarBrands: []
        }
        this.handleMakeChange = this.handleMakeChange.bind(this);
    }

    handleMakeChange(carMake) {
        this.setState({carMake})
    }

    componentDidMount() {
      this.getToken();
      fetch('https://gist.githubusercontent.com/watthell234/a33bdd1ffe937975e4643cec5eec1859/raw/febb04707f6ccc9ae3a445e147c5754e30f743fe/car_brands.json')
      .then(response => response.json()).then(data => this.setState({majorCarBrands: data}));
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
        const {carCreate} = this.state;
        return (
          <View style={styles.container}>
              <View>
                  <Text style={styles.title}
                      category='h1'>Car Info</Text>
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
