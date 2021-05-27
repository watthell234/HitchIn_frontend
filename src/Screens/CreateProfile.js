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
        <Text style={styles.title} category='h1'>Create Profile</Text>

        <View style={styles.create_profile_container}>
          <Text>With</Text>
          {/*
          <TouchableOpacity
          style={styles.button}
          onPress={() => {this.props.navigation.navigate('QRTabs')}}>
          <Text style={{color: "#FFFFFF"}}>Next</Text>
          </TouchableOpacity>
          */}

          <TouchableOpacity style={styles.button}>
            <Text
              style={[styles.button_text, {color: "#1d47e0"}]}> Connect with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              style={[styles.button_text, {color: "#e01d1d"}]}> Connect with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => {this.props.navigation.navigate('SignUp')}}
              style={[styles.button_text]}> Create New Account
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.empty_container}>
        </View>
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

  create_profile_container: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  empty_container: {
    flex: 2,
  },

  title: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    fontSize: 32,
    color: "#404e5a"

  },

  button_text: {
    fontSize: 17,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    width: 250,
    borderRadius: 250,
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
