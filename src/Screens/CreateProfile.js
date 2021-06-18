import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';



export default function CreateProfileScreen({navigation: {navigate}}) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '375582128350-5t6kr6tuuaai9cabijrsm521gqoe1dv2.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const  accessToken  = authentication?.accessToken
      console.log(authentication);
      console.log(accessToken);
      const  data  = fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,phoneNumbers,clientData,photos,birthdays', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      }).then(response => response.json()).then(data => console.log(data.emailAddresses[0].value));
      }
  }
  , [response]);


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

          <TouchableOpacity style={styles.button}
          onPress={ () => {
            promptAsync();
            }}>

            <Text
              style={[styles.button_text, {color: "#e01d1d"}]}> Connect with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => navigate('SignUp')}
              style={[styles.button_text]}> Create New Account
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.empty_container}>
        </View>
      </View>
      )
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

  iconSize: {
    width: 48,
    height: 48,
  },

  standardSize: { width: 212, height: 48 },
  wideSize: { width: 312, height: 48 },

GoogleSigninButton: {
  // Icon: BUTTON_SIZE_ICON,
  // Standard: BUTTON_SIZE_STANDARD,
  // Wide: BUTTON_SIZE_WIDE,
  // Auto: RNGoogleSignin.BUTTON_COLOR_AUTO,
  // Light: "#FFFFFF",
  // Dark: RNGoogleSignin.BUTTON_COLOR_DARK,
}
});
