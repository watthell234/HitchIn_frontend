import React from 'react';
import { Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './styles/styles_initpage';
// import { socket } from '/Users/cyril/Desktop/HitchIn/hitchFront/App';


export default class InitScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataFromServer: "null",
          endData: "null"
      }

    }

tearDownWebsocket = () => {

  }

  componentWillUnmount() {
    this.tearDownWebsocket();
  }

  setupWebsocket = () => {
    this.socket = io("wss://hitchin-server.herokuapp.com/");
    // this.socket = io("ws://127.0.0.1:5000/");


     this.socket.on("roomjoin", (e) => {
       console.log(e.data);
       this.setState({dataFromServer: e.data});
     });

     this.socket.on("endtrip", (t) => {
       this.props.navigation.navigate('EndTrip')
       console.log(t.data);
       this.setState({endData: t.data});
     });


  }


componentDidMount() {

  this.setupWebsocket();

  }

  sendMessage =  () => {

  this.socket.emit("join", {username: userId, pool_id: carQr});

  }

  endTrip =  () => {

  this.socket.emit("leave", {pool_id: carQr});


  }

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.title} category='h1'>
                {'\n'}Welcome to{'\n'}
                <Text style={styles.title_hitchin}> HitchIn </Text>
              </Text>
                  {/*
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.sendMessage()}}>
                      <Text style={{color: "#FFFFFF", fontSize:20}}>message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.endTrip()}}>
                      <Text style={{color: "#FFFFFF", fontSize:20}}>End Trip</Text>
                  </TouchableOpacity>

                  <Text style={styles.title}category='h3'>
                  {'\n'}{this.state.dataFromServer}
                  </Text>

                  <Text style={styles.title}category='h3'>
                  {'\n'}{this.state.endData}
                  </Text>

                  */}
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
