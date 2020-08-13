import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';


export default class InitScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}
                      category='h1'>Welcome to {'\n'}HitchIn</Text>
                      <Image style={styles.image}
                          source={require('./assets/noun_car_garage.png')}></Image>
                          <TouchableOpacity
                              style={styles.button}
                              onPress={() => {this.props.navigation.navigate('CarpoolRoute')}}>
                              <Text style={{color: "#FFFFFF"}}>Get Started</Text>
                          </TouchableOpacity>
                          <View style={styles.flowRight}>
                              <Text
                                style={styles.row}>Already have an account?</Text>
                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => {this.props.navigation.navigate('Login')}}>
                                    <Text style={{textDecorationLine: 'underline', color: '#0645AD', fontSize: 16, paddingBottom: 7 }}>Login</Text>
                                </TouchableOpacity>
                                </View>
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
   title: {
       marginBottom: 20,
       fontSize: 18,
       fontWeight: 'bold',
       fontSize: 32,
       color: '#404e5a'

   },
   flowRight: {
       flexDirection: 'row',
       alignItems: 'center',
   },
   row: {
       height: 36,
       padding: 4,
       marginRight: 5,
       fontSize: 18,
   },
   button: {
       alignItems: "center",
       backgroundColor: "#404e5a",
       padding: 10,
       width: 250,
    },
   image: {
       width: 180,
       height: 400,
   },
 });
