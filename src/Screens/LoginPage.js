import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http } from './constants/hitchBackendapi';
import {styles} from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,
            password: null
        }
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(phoneNumber) {
        this.setState({phoneNumber})
    }

    async storeToken(user, token) {
      try {
        await AsyncStorage.setItem("userId", JSON.stringify(user));
        await AsyncStorage.setItem("authToken", JSON.stringify(token));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    onLogin() {
        const {Login, phoneNumber, password} = this.state;
        if (!Login) {
            http.post('/login', {phoneNumber, password})
            .then((response) => {
              console.log(response.data.id)
              console.log(response.data.auth_token)
              this.storeToken(response.data.id, response.data.auth_token)
            })
            .then(() => this.setState({Login: true}))
            .then(() => this.props.navigation.navigate('CarpoolRoute'))
            .catch((err) => console.log(err))

        }
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
                    onChangeText={this.handleNameChange}
                    placeholder="Mobile Phone Number"
                    value={this.state.phoneNumber}
                    onBlur={Keyboard.dismiss}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder="Password"
                    onBlur={Keyboard.dismiss}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.onLogin()}}>
                    <Text style={{color: "#FFFFFF"}}>Login</Text>
                </TouchableOpacity>
                <Text> Login: {Login ? 'Successful' : 'Fail'}</Text>
            </View>
        </View>
        );

    }
}
