import React from 'react';
<<<<<<< HEAD
import { StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ImageBackground,
  Keyboard,
  TouchableOpacity } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
=======
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
>>>>>>> master



export default class InitScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataFromServer: "null",
      }

    }



tearDownWebsocket = () => {

<<<<<<< HEAD

=======
>>>>>>> master
  }

  componentWillUnmount() {
    this.tearDownWebsocket();
  }

<<<<<<< HEAD
  setupWebsocket = () => {
    this.socket = io("wss://hitchin-server.herokuapp.com/");

     this.socket.on("my_response", (r) => {
       console.log(this.socket.connected);
       console.log(r.data);
     });


     this.socket.on("events", (e) => {
       console.log(e.data);
       this.setState({dataFromServer: e.data});
       // this.props.navigation.navigate('EndTrip');
     });

     this.socket.on("roomjoin", (e) => {
       console.log(e.data);

     });

     this.socket.on("roomexit", (e) => {
       console.log(e.data);

     });



  }

componentDidMount() {
  this.setupWebsocket();

  }

  sendMessage =  () => {

  this.socket.emit("event", "hi");
  this.socket.emit("join", {username: 'Julius', pool_id: 2});
  }

  exitPool = () => {
  this.socket = io("https://hitchin-server.herokuapp.com/");
  this.socket.emit("leave", {username: 'Julius', pool_id: 2});

=======
componentDidMount() {
>>>>>>> master

  }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.title}
                  category='h1'>{'\n'}HitchIn</Text>
<<<<<<< HEAD
                  <Text style={styles.title}
                        category='h2'>{this.state.dataFromServer}</Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {this.sendMessage()}}>
                          <Text style={{color: "#FFFFFF"}}>Change</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.exitPool()}}>
                        <Text style={{color: "#FFFFFF"}}>Exit</Text>
                    </TouchableOpacity>
=======
>>>>>>> master
                      <Image style={styles.image}
                          source={require('./assets/car.png')}></Image>
                          <TouchableOpacity
                              style={styles.button}
                              onPress={() => {this.props.navigation.navigate('SignUp')}}>
                              <Text style={{color: "#FFFFFF", fontSize:20}}>GET STARTED</Text>
                          </TouchableOpacity>
                          <View style={styles.flowRight}>
                              <Text
                                style={styles.row}>Already have an account?</Text>
                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => {this.props.navigation.navigate('Login')}}>
                                    <Text style={{textDecorationLine: 'underline', color: '#0645AD', fontSize: 16, paddingBottom: 7 }}>SIGN IN</Text>
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
