import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InitScreen from './src/Screens/InitPage';
import SignUpScreen from './src/Screens/Signup';
import CarpoolRoute from './src/Screens/CarpoolRoute';
import LoginScreen from './src/Screens/LoginPage';
import CreateProfileScreen from './src/Screens/CreateProfile';
import Position from './src/Screens/Position';
import PairingScreen from './src/Screens/Pairing';
import QRReader from './src/Screens/QRscan';
import CarForm from './src/Screens/CarForm';
import EndTripScreen from './src/Screens/EndTrip';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';

// export const socket = io("wss://hitchin-server.herokuapp.com/");
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


class AppHome extends React.Component {
  render() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="QRScan" component={QRReader} />
      <Tab.Screen name="Pairing" component={PairingScreen} />
    </Tab.Navigator>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null
    }
  }

  async getToken(token) {
    try {
      let getToken = await AsyncStorage.getItem("authToken");
      let userToken = JSON.parse(getToken);
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
    return (
      <NavigationContainer>
        <Stack.Navigator>
        { this.state.userToken == null ? (
          <>
            <Stack.Screen name="Init" component={InitScreen} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
            <Stack.Screen name="CarForm" component={CarForm} options={{ title: 'Car' }}/>
            <Stack.Screen name="Home" component={AppHome} />
            <Stack.Screen name="Pairing" component={PairingScreen} />
            <Stack.Screen name="Position" component={Position} />
            <Stack.Screen name="EndTrip" component={EndTripScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={AppHome} />
            <Stack.Screen name="Pairing" component={PairingScreen} />
            <Stack.Screen name="Position" component={Position} />
            <Stack.Screen name="EndTrip" component={EndTripScreen} />
          </>
        ) }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default {App};
