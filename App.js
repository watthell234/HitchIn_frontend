import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, SafeAreaView, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { createAppContainer, NavigationContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
// import Branch, { BranchEvent } from 'react-native-branch';
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
import PhoneNumberScreen from './src/Screens/PhoneNumber';
import UserProfileScreen from './src/Screens/UserProfile';
import EndTripScreen from './src/Screens/EndTrip';


// Sentry.init({
//   dsn: 'https://ec5caaabba9b489686c9f1768c117b62@o931327.ingest.sentry.io/5880255',
//   enableInExpoDevelopment: true,
//   debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
// });
// //
// Branch.subscribe(bundle => {
//   if (bundle && bundle.params && !bundle.error) {
//       console.log("link exists");
//       console.log(bundle.params);
//   }
// });


const RootStack = createStackNavigator({
  HitchIn: {
    screen: InitScreen,
  }
  ,
  Login: LoginScreen,
  // CreateProfile: {
  //   screen: CreateProfileScreen,
  //   navigationOptions: {
  //     title: "Sign Up",
  //
  //   }
  // },
  PhoneNumber: {
    screen: PhoneNumberScreen
  },
  UserProfile: {
    screen: UserProfileScreen
  },

  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },

});

// Later down the road we will have to
// Move all the trip related screens to here.
const DriverStack = createStackNavigator({
  CarList: {
    screen: CarListScreen,
    navigationOptions:  {
      headerLeft: () => null,
      headerShown: false,
    }},
    CarInfo: {
      screen : CarInfoScreen,
      navigationOptions:  {
        headerLeft: () => null,
        headerShown: false,
      }},
      Pairing: {
        screen: PairingScreen,
        navigationOptions:  {
          headerLeft: () => null,
          headerShown: false,
        }},
        DriverPosition: {
          screen: DriverPositionScreen,
          navigationOptions:  {
          headerLeft: () => null,
          headerShown: false,
        }},
        EndTrip: {
          screen: EndTripScreen,
          navigationOptions:  {
          headerLeft: () => null,
          headerShown: false,
        }}
      })

      const RiderStack = createStackNavigator({
        QRReader: { screen: QRReaderScreen,
          navigationOptions:  {
            headerLeft: () => null,
            headerShown: false,
          }},
          RiderPosition: { screen: RiderPositionScreen,
            navigationOptions:  {
              headerLeft: () => null,
              headerShown: false,
            }},
            EndTrip: { screen: EndTripScreen,
              navigationOptions:  {
                headerLeft: () => null,
                headerShown: false,
              }}
            })

            const BottomTab = createBottomTabNavigator({
              Ride: { screen: RiderStack,
                navigationOptions:  {
                  title: 'Rider',
                  tabBarIcon:({tintColor})=>(
                    <Icon name="people-outline" color={tintColor} size={25}/>
                  ) },
                },
                Drive: { screen: DriverStack,
                  navigationOptions:  {
                    title: 'Driver',
                    tabBarIcon:({tintColor})=>(
                      <Icon name="car-outline" color={tintColor} size={25}/>
                    ) }},
                    Profile:  { screen: UserProfile,
                      navigationOptions:  {
                        title: 'Profile',
                        tabBarIcon:({tintColor})=>(
                          <Icon name="person-outline" color={tintColor} size={25}/>
                        ) }
                      },
                    },
                      {
                        initialRouteName: "Drive",
                      }
                    );

                    const LoggedInStack = createStackNavigator({
                      CarpoolRoute: CarpoolRouteScreen,
                      BottomTab: BottomTab
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

                    const AppContainer = createAppContainer(
                      createSwitchNavigator(
                        {
                          AuthLoading: AuthLoadingScreen,
                          Root: RootStack,
                          LoggedIn: LoggedInStack,
                          // Driver: DriverStack,
                          // RiderTrip: RiderStack,
                          Tabs: BottomTab,

                        },
                        {
                          initialRouteName: 'AuthLoading',
                        }
                      )
                    );

                    export default class App extends React.Component {
                      render() {
                        return (
                          <AppContainer />
                        );
                      }
                    }
