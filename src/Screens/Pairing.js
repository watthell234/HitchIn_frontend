import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { http } from './constants/hitchBackendapi';

export default class PairingScreen extends React.Component {

    onPress() {

      const passengers = () => http.get('/cartrips/1')
      .then((response) => response.data.slugs)
      .catch((err) => console.log(err));

      if (passengers >= 3) {
        this.props.navigation.navigate('Position');
      }
      else {Alert.alert("Alert Title",
      console.log(passengers().then(response)),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],      { cancelable: false }
    );
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
