import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class EndTripScreen extends React.Component {
  constructor(props) {
      super (props);
  }


  onPress() {
    this.props.navigation.navigate('LoggedIn');
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
