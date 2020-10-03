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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class QRTabs extends React.Component {
  render() {
  return (
    <Tab.Navigator initialRouteName="QRScan">
      <Tab.Screen name="QRScan" component={QRReader} />
      <Tab.Screen name="Pairing" component={PairingScreen} />
    </Tab.Navigator>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Init">
          <Stack.Screen name="Init" component={InitScreen} />
          <Stack.Screen name="CarpoolRoute" component={CarpoolRoute} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
          <Stack.Screen name="Position" component={Position} />
          <Stack.Screen name="Pairing" component={PairingScreen} />
          <Stack.Screen name="CarForm" component={CarForm} />
          <Stack.Screen name="QRTabs" component={QRTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
