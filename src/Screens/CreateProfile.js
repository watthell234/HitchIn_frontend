import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';

const serverUrl = 'http://192.168.1.158:5000';
const http = axios.create({
    baseURL: serverUrl,
});

export default class CreateProfileScreen extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.title}
                  category='h1'>Create Profile</Text>
                      <Text>With</Text>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.props.navigation.navigate('Position')}}>
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
