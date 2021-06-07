import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import CarForm from './src/Screens/CarForm';
import EndTripScreen from './src/Screens/EndTrip';
import CarInfoScreen from './src/Screens/CarInfo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Init" component={InitScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function LoggedIn() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarpoolRoute" component={CarpoolRouteScreen} />
      <Stack.Screen name="RideOrDrive" component={RideOrDriveScreen} />
      <Stack.Screen name="CarInfo" component={CarInfoScreen} />
      <Stack.Screen name="CarForm" component={CarForm} />
      <Stack.Screen name="Pairing" component={PairingScreen} />
      <Stack.Screen name="Position" component={Position} />
      <Stack.Screen name="EndTrip" component={EndTripScreen} />
    </Stack.Navigator>
  );
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null
    }
  }

  async getToken(token) {
    try {
      let token = await AsyncStorage.getItem("authToken");
      let userToken = JSON.parse(token);
      console.log(userToken);
      this.setState({userToken: userToken})
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidMount() {

    this.getToken();
  }

  render() {
    const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Root" component={Root} />
          <Drawer.Screen name="LoggedIn" component={LoggedIn} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
