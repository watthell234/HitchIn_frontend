import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/styles';

export default class EndTripScreen extends React.Component {
  constructor(props) {
      super (props);
  }


  onPress() {
    this.props.navigation.navigate('CarpoolRoute');
  }

    render() {
        return (
            <View style={styles.container}>
              <Text>HitchIn</Text>
                <Text>Your Hitch has Ended!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.onPress()}}>
                    <Text style={{color: "#FFFFFF"}}>End Trip</Text>
                </TouchableOpacity>
        </View>
    )
    }
}
