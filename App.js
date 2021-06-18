import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { createAppContainer, NavigationContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import io from 'socket.io-client';
import InitScreen from './src/Screens/InitPage';
import LoginScreen from './src/Screens/LoginPage';
import CreateProfileScreen from './src/Screens/CreateProfile';
import SignUpScreen from './src/Screens/Signup';

import CarpoolRouteScreen from './src/Screens/CarpoolRoute';
import RideOrDriveScreen from './src/Screens/RideOrDrive';
import CarListScreen from './src/Screens/CarList';
import CarInfoScreen from './src/Screens/CarInfo';
import QRReaderScreen from './src/Screens/QRreader';

import PairingScreen from './src/Screens/Pairing';
import Position from './src/Screens/Position';
import EndTripScreen from './src/Screens/EndTrip';

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
  CarList: CarListScreen,
  CarInfo: CarInfoScreen,
  QRReader: QRReaderScreen,
});
// Later down the road we will have to
// Move all the trip related screens to here.
const TripStack = createStackNavigator({
  Pairing: PairingScreen,
  Position: Position,
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
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator>
        { this.state.userToken == null ? (
          <>
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
            <Stack.Screen name="Init" component={InitScreen} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
            <Stack.Screen name="CarpoolRoute" component={CarpoolRouteScreen} />
            <Stack.Screen name="RideOrDrive" component={RideOrDriveScreen} />
            <Stack.Screen name="CarForm" component={CarForm} options={{ title: 'Car' }}/>
            <Stack.Screen name="Home" component={AppHome} />
            <Stack.Screen name="Pairing" component={PairingScreen} />
            <Stack.Screen name="Position" component={Position} />
            <Stack.Screen name="EndTrip" component={EndTripScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="CarpoolRoute" component={CarpoolRouteScreen} />
            <Stack.Screen name="RideOrDrive" component={RideOrDriveScreen} />
            <Stack.Screen name="Pairing" component={PairingScreen} />
            <Stack.Screen name="Position" component={Position} />
            <Stack.Screen name="EndTrip" component={EndTripScreen} />
          </>
        ) }
        </Stack.Navigator>
      </NavigationContainer>
    );
=======
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
>>>>>>> master
  }
}

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Root: RootStack,
      LoggedIn: LoggedInStack,
      Trip: TripStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
