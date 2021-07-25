import React from 'react';
import { Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './styles/styles_initpage';
import { http, getAxios } from './constants/hitchBackendapi';


export default class InitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromServer: "null",
      endData: "null"
    }

  }
  componentDidMount() {

    http.get(`/`)
    .then((response) => console.log(response.data));

  }


  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title} category='h1'>
      {'\n'}Welcome to{'\n'}
      <Text style={styles.title_hitchin}> HitchIn </Text>
      </Text>
        <Image style={styles.hitchin_logo} source={require('./assets/car.png')}></Image>
        <TouchableOpacity
        style={styles.signup_button}
        onPress={() => {this.props.navigation.navigate('CreateProfile')}}>
        <Text style={{color: "#FFFFFF", fontSize:20}}>
        GET STARTED
        </Text>
        </TouchableOpacity>

        <View style={styles.signin_container}>
        <Text style={styles.row}>Already have an account?</Text>
        <TouchableOpacity
        style={styles.signin_button}
        onPress={() => {this.props.navigation.navigate('Login')}}>
        <Text style={styles.signin_button}>SIGN IN</Text>
        </TouchableOpacity>
        </View>
        </View>
      )
    }
  }
