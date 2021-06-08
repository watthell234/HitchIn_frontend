import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { createAppContainer, NavigationContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import io from 'socket.io-client';
import InitScreen from './src/Screens/InitPage';
import SignUpScreen from './src/Screens/Signup';
import CreateProfileScreen from './src/Screens/CreateProfile';
import CarpoolRouteScreen from './src/Screens/CarpoolRoute';
import RideOrDriveScreen from './src/Screens/RideOrDrive';
import LoginScreen from './src/Screens/LoginPage';
import Position from './src/Screens/Position';
import PairingScreen from './src/Screens/Pairing';
import QRReader from './src/Screens/QRscan';
import CarFormScreen from './src/Screens/CarForm';
import EndTripScreen from './src/Screens/EndTrip';
import CarInfoScreen from './src/Screens/CarInfo';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

const RootStack = createStackNavigator({
  Init: InitScreen,
  Login: LoginScreen,
  CreateProfile: CreateProfileScreen,
  SignUp: SignUpScreen
});

const LoggedInStack = createStackNavigator({
  CarpoolRoute: CarpoolRouteScreen,
  RideOrDrive: RideOrDriveScreen,
  CarInfo: CarInfoScreen,
  CarForm: CarFormScreen,
  Pairing: PairingScreen,
  Position: Position,
  EndTrip: EndTripScreen
});

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

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Root: RootStack,
      LoggedIn: LoggedInStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
