import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../Screens/styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LogOut extends React.Component {

  _signOutAsync = async () => {
    try {
      await AsyncStorage.clear();
      console.log("clear");
      this.props.navigation.navigate('Root');
    } catch(error) {
      console.log("Could not clear token", error);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {this._signOutAsync()}}>
        <Text style={{color: "#FFFFFF"}}>Log Out</Text>
      </TouchableOpacity>
    )
  }

}
