import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { styles } from './styles/styles';

export default class RideOrDriveScreen extends React.Component {
  constructor(props) {
    super(props);
  };

  handleSubmit(action) {
    if(action == 'ride') {

    }else if(action == 'drive') {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit('ride')}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit('drive')}>
          <Text style={{color: "#FFFFFF", fontSize:20}}>Drive</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
