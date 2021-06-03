import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { http } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class EndTripScreen extends React.Component {
  constructor(props) {
      super (props);
      this.state = {
      // Ended  : null,
      }
  }

  async getCarId() {
    try {
      let data = await AsyncStorage.getItem("carId");
      let carData = JSON.parse(data);
      console.log(data);
      return data
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getToken(user, token) {
    try {
      let getUserId = await AsyncStorage.getItem("userId");
      let userId = JSON.parse(getUserId);
      let getToken = await AsyncStorage.getItem("token");
      let token = JSON.parse(getToken);
      console.log(userId);
      this.setState({userId: userId});
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  onPress() {
    let carId = getCarId()
    http.post('/cartrips/' + {carId})
    .then((response) => this.storeToken(response.data.id))
    // .then(() => this.setState({Ended: true}))
    .then(() => this.props.navigation.navigate(''))
    .catch((err) => console.log(err))

  }

    render() {
        return (
            <View style={styles.container}>
              <Text>HitchIn</Text>
                <Text>End Trip?</Text>
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
