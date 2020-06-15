import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const serverUrl = 'http://192.168.1.158:5000';
const http = axios.create({
    baseURL: serverUrl,
});

export default class CarpoolRoute extends React.Component {
        state = {
            stop: 'Fort Lee Bus Station',
        }
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.title}
                  category='h1'>Port Authority {'\n'}Carpool Route</Text>
                  <View style={styles.routeOrientation}>
                      <Text>Pickup</Text>
                      {/* TODO: change TextInputs to Pickers when I have a MacBook to add native component to iOS  */}
                      <TextInput style={styles.textInput} placeholder="Fort Lee Bus Station"></TextInput>
                  </View>
                  <View style={styles.routeOrientation}>
                      <Text>Drop-off</Text>
                      <TextInput style={styles.textInput} placeholder="178th st & Fort Washington"></TextInput>
                  </View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.props.navigation.navigate('SignUpScreen')}}>
                      <Text style={{color: "#FFFFFF"}}>Next</Text>
                  </TouchableOpacity>
      </View>
              )
    }
}



const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: "#AAB7BD",
       alignItems: "center",
   },
   title: {
       marginBottom: 20,
       fontSize: 18,
       fontWeight: "bold",
       fontSize: 32,
       color: "#404e5a"

   },
   button: {
       alignItems: "center",
       backgroundColor: "#404e5a",
       padding: 10,
       width: 250,
   },
   routeOrientation: {
       flexDirection: "row",
       alignItems: 'center',
   },
   textInput: {
       backgroundColor: "#FFFFFF",
       borderWidth: 1,
       borderColor: "#AAB7BD"

   },
});
