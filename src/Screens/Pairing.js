import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default class PairingScreen extends React.Component {

    onPress() {
      if (2 >= 2) {
        this.props.navigation.navigate('Position');
      }
    }

    render() {
        return (
            <View style={styles.container}>
              <Text>HitchIn</Text>
                <Text>Carpool Ready?</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.onPress()}}>
                    <Text style={{color: "#FFFFFF"}}>Start Trip</Text>
                </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AAB7BD',
        alignItems: 'center',
  },
    button: {
      alignItems: "center",
      backgroundColor: "#404e5a",
      padding: 10,
      width: 250,
    },

     }
)
