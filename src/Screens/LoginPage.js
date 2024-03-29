import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http } from './constants/hitchBackendapi';
import {styles} from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            clicked: false
        }
    }

    handleTextChange(name, value) {
      let input = this.state.input;

      input[name] = value;

      this.setState({
        input
      });
    }

    async storeToken(user, token) {
      try {
        await AsyncStorage.setItem("userID", JSON.stringify(user));
        await AsyncStorage.setItem("authToken", JSON.stringify(token));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    handleSubmit() {
        const {phoneNumber, password} = this.state.input;
        this.setState({
          clicked: true
        })
        http.post('/login', {phoneNumber, password})
        .then((response) => {
          // console.log(response.data.id)
          // console.log(response.data.auth_token)
          this.storeToken(response.data.id, response.data.auth_token)
        })
        .then(() => this.props.navigation.navigate('LoggedIn'))
        .catch((error) => {
          if(error.response){
            let errors = {};
            let status = error.response.status;
            //403
            if(status == 401) {
              errors['password'] = 'Wrong password. Try again.';
            }else if(status == 402) {
              errors['phone_number'] = 'User does not exist. Make sure to sign up first.';
            }

            this.setState({
              errors,
              clicked: false
            })
          } else if(errors.request){
            console.log(error.request);
          } else {
            console.log(error.message);
          }
        })

    }
    render() {
        const {Login} = this.state;
        return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}
                      category='h1'>Welcome back!</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="phone-pad"
                    onChangeText={(value) => this.handleTextChange('phoneNumber', value)}
                    placeholder="Mobile Phone Number"
                    value={this.state.phoneNumber}
                    onBlur={Keyboard.dismiss}
                />
                <Text> {this.state.errors['phone_number']} </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => this.handleTextChange('password', value)}
                    value={this.state.password}
                    placeholder="Password"
                    onBlur={Keyboard.dismiss}
                    secureTextEntry={true}
                />
                <Text> {this.state.errors['password']} </Text>
                {this.state.clicked? <TouchableOpacity
                    style={styles.button}
                    disabled={true}>
                    <Text style={{color: "#FFFFFF"}}>Logging In...</Text>
                </TouchableOpacity>
                :<TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleSubmit()}>
                    <Text style={{color: "#FFFFFF"}}>Login</Text>
                </TouchableOpacity>}
            </View>
        </View>
        );

    }
}
