import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';

export default class CarpoolRoute extends React.Component {

    get_location_lists() {

      let pickup_lists;
      let dropoff_lists;

      http.get('/routes')
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log("------------------------------------")
        console.log(error)
        console.log("------------------------------------")
      })
    }

    render() {
        this.get_location_lists();
        return (
        <View style={styles.container}>
            <Text style={styles.title}
                  category='h1'>Port Authority {'\n'}Carpool Route</Text>
                  <View style={styles.routeOrientation}>
                      <Text>Pickup</Text>
                      {/* TODO: change TextInputs to Pickers when I have a MacBook to add native component to iOS  */}
                  </View>
                  <View style={styles.routeOrientation}>
                      <Text>Drop-off</Text>
                      <TextInput style={styles.textInput} placeholder="178th st & Fort Washington"></TextInput>
                  </View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.props.navigation.navigate('SignUp')}}>
                      <Text style={{color: "#FFFFFF"}}>Next</Text>
                  </TouchableOpacity>
      </View>
              )
    }
}
