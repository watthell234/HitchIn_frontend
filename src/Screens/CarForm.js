import React from 'react';
import { Text, View, Button, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { styles } from './styles/styles'


const serverUrl = 'https://hitchin-server.herokuapp.com';
const http = axios.create({
    baseURL: serverUrl,
});

export default class CarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carMake: null,
            carColor: null,
            carYear: null,
            licensePlate: null,
            ezpassTag: null,
        }
        this.handleMakeChange = this.handleMakeChange.bind(this);
    }

    handleMakeChange(carMake) {
        this.setState({carMake})
    }


    onCreateQR() {
        const {carCreate, carMake, carColor, carYear, licensePlate, ezpassTag} = this.state;
        if (!carCreate) {
            http.post('/car', {carMake, carColor, carYear, licensePlate, ezpassTag})
            .then(() => this.setState({carCreate: true})).then(() => this.props.navigation.navigate(''))
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
                      <Text style={{color: "#FFFFFF"}}>"Create QR Code"</Text>
                  </TouchableOpacity>
                  <Text> Car Creation: {carCreate ? 'Successful' : 'Fail'}</Text>
              </View>
          </View>
        );

    }
}
