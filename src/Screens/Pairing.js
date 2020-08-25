import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { http } from './constants/hitchBackendapi';

export default class PairingScreen extends React.Component {
  constructor(props) {
      super (props);
      this.state = {
        passengerCount: null,
      }
  }

 async getPassCount() {
    try {
    const response = await http.get('/cartrips/1');
    console.log("Riders Checkedin" ,response.data.slugs);
    return response.data.slugs
    } catch (error) {
      console.log("Something went wrong", error);
    }
}

  async onPress() {
      let passengerCount = await this.getPassCount();
      console.log(passengerCount);
      if (passengerCount >= 3) {
        this.props.navigation.navigate('Position');
      }
      else { Alert.alert("Insufficient Passengers",
      "You have " + passengerCount.toString() + " passenger(s) you need 3 to carpool",
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
