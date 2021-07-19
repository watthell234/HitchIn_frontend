import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogOut from '../Buttons/LogOut.js';

export default class RideOrDriveScreen extends React.Component {
  constructor(props) {
    super(props);
  };

  async handleSubmit(action) {
    if(action == 'ride') {

      this.props.navigation.navigate('RiderTrip');

    }else if(action == 'drive') {

      this.props.navigation.navigate('CarList');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LogOut navigation={this.props.navigation}/>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSubmit('ride')}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSubmit('drive')}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Drive</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
