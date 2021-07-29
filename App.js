import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { createAppContainer, NavigationContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';


// import io from 'socket.io-client';
import InitScreen from './src/Screens/InitPage';
import LoginScreen from './src/Screens/LoginPage';
import CreateProfileScreen from './src/Screens/CreateProfile';
import SignUpScreen from './src/Screens/Signup';

import CarpoolRouteScreen from './src/Screens/CarpoolRoute';
import RideOrDriveScreen from './src/Screens/RideOrDrive';
import CarListScreen from './src/Screens/CarList';
import CarInfoScreen from './src/Screens/CarInfo';

import PairingScreen from './src/Screens/Pairing';
import DriverPositionScreen from './src/Screens/DriverPosition';

import QRReaderScreen from './src/Screens/QRreader';
import RiderPositionScreen from './src/Screens/RiderPosition';
import UserProfile from './src/Screens/Profile'

import EndTripScreen from './src/Screens/EndTrip';

const routingInstrumentation = new Sentry.Native.ReactNavigationV4Instrumentation();

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// Sentry.init({
//   dsn: 'https://ec5caaabba9b489686c9f1768c117b62@o931327.ingest.sentry.io/5880255',
//   enableInExpoDevelopment: true,
//   debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
//   integrations: [
//     new Sentry.Native.ReactNativeTracing({
//       tracingOrigins: ["https://hitchin-server.herokuapp.com"],
//       routingInstrumentation,
//     }),
//   ],
//   tracesSampleRate: 0.1,
//   sessionTrackingIntervalMillis: 10000,
// });

// Sentry.Native.captureException('message')

const RootStack = createStackNavigator({
  Start: {
        screen: InitScreen,
        navigationOptions: {
        headerShown: false}}
        ,
  Login: LoginScreen,
  CreateProfile: {
                screen: CreateProfileScreen,
                navigationOptions: {
                  title: "Sign Up"
                }
              },
  SignUp: {
          screen: SignUpScreen,
          navigationOptions: {
            title: "Sign Up"
          }
        }

});

const LoggedInStack = createStackNavigator({
  CarpoolRoute: CarpoolRouteScreen,
  RideOrDrive: RideOrDriveScreen,
  CarList: CarListScreen,
  CarInfo: CarInfoScreen,
});
// Later down the road we will have to
// Move all the trip related screens to here.
const DriverTripStack = createStackNavigator({
  Pairing: PairingScreen,
  DriverPosition: DriverPositionScreen,
  EndTrip: EndTripScreen
})

const RiderTripStack = createStackNavigator({
  QRReader: QRReaderScreen,
  RiderPosition: RiderPositionScreen,
  EndTrip: EndTripScreen
})

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  async _bootstrapAsync() {
    try {
      let userToken = await AsyncStorage.getItem("authToken");
      this.props.navigation.navigate(userToken ? 'LoggedIn' : 'Root')
    } catch (error) {
      console.log("Could not retrieve token", error);
    }
  }

  render() {
    return (

      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )

  }
}

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Root: RootStack,
      LoggedIn: LoggedInStack,
      DriverTrip: DriverTripStack,
      RiderTrip: RiderTripStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default class App extends React.Component {
  // appContainer = React.createRef();
  // componentDidMount() {
  //   routingInstrumentation.registerAppContainer(this.appContainer);
  // }
  render() {
    return (
      <AppContainer />
    );
  }
}
