import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Sentry from 'sentry-expo';



export default function CreateProfileScreen({navigation: {navigate}}) {

try {
  const [grequest, gresponse, gpromptAsync] = Google.useAuthRequest({
    expoClientId: '375582128350-5t6kr6tuuaai9cabijrsm521gqoe1dv2.apps.googleusercontent.com',
    iosClientId: '375582128350-68gmbmre7qp4fo0o2prbnlmnpkbq3r50.apps.googleusercontent.com',
    androidClientId: '375582128350-9ptmmdija9ac2u08h7dvfnu5t87d0cl5.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });




  React.useEffect(() => {
    if (gresponse?.type === 'success') {
      const { authentication } = gresponse;
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
      }).then(response => response.json())
      .then(data =>  navigate('SignUp',
      { email: data.emailAddresses[0].value,
        firstName: data.names[0].givenName,
        lastName: data.names[0].familyName,
        photoUrl: data.photos[0].url
      })).catch(err => Sentry.captureException(err));
    }
  }
  , [gresponse]);


  return (
    <View style={styles.container}>

    <View style={styles.create_profile_container}>
    <Text style={styles.title}>Create Profile</Text>
    <Text>With</Text>
    <TouchableOpacity style={styles.fbbutton}>
    <Text
    style={[styles.button_text]}> Connect with Facebook
    </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.gbutton}
    onPress={ () => {
      gpromptAsync();
    }}>
    <Text
    style={[styles.button_text]}> Connect with Google
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
catch (e) {
  Sentry.captureException(e)
}
}





const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
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
    fontWeight: "bold",
    fontSize: 24,
    color: "#404e5a"

  },

  button_text: {
    fontSize: 17,
    color:'white'
  },

  button: {
    alignItems: "center",
    backgroundColor: "#404E5A",
    padding: 10,
    width: 250,
    borderRadius:8,

  },
  // fbbutton: {
  //   alignItems: "center",
  //   backgroundColor: "#4267B2",
  //   padding: 10,
  //   width: 250,
  //   borderRadius:8,
  // },
  gbutton: {
    alignItems: "center",
    backgroundColor: "#DB4437",
    padding: 10,
    width: 250,
    borderRadius:8,
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
