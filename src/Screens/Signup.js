import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';
// import {CheckBox} from './components/CheckBox'
import { Checkbox } from 'react-native-paper';


const serverUrl = 'https://hitchin-server.herokuapp.com';
const http = axios.create({
    baseURL: serverUrl,
});
// const checked = false;
// const

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            checked: true,
        }
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(phoneNumber) {
        this.setState({phoneNumber})
    }
    onSignUp() {
        const {accountCreate, phoneNumber, firstName, lastName, email, password, checked} = this.state;
        if (!accountCreate) {
            http.post('/sign-up', {phoneNumber, firstName, lastName, email, password, checked})
            .then(() => this.setState({accountCreate: true})).then(() => this.props.navigation.navigate('CreateProfile'))
            .catch((err) => console.log(err))

        }
    }
    render() {
        const {accountCreate, checked} = this.state;
        return (
          <View style={styles.container}>
              <View>
                  <Text style={styles.title}
                        category='h1'>Sign Up</Text>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={this.handleNameChange}
                      placeholder="Mobile Phone Number"
                      value={this.state.phoneNumber}
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(firstName) => this.setState({firstName})}
                      value={this.state.firstName}
                      placeholder="First Name"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(lastName) => this.setState({lastName})}
                      value={this.state.lastName}
                      placeholder="Last Name"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(email) => this.setState({email})}
                      value={this.state.email}
                      placeholder="Email"
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
                  <Checkbox.Item
                    label= {`Checkbox status: + ${this.state.checked}`}
                    disabled = {!this.state.checked}
                    labelStyle={{}}
                    status={'checked'}
                    onPress={() => this.setState({checked: !checked})}
                    color='black'
                  />
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.onSignUp()}}>
                      <Text style={{color: "#FFFFFF"}}>Next</Text>
                  </TouchableOpacity>
                  <Text> Account Creation: {accountCreate ? 'Successful' : 'Fail'}</Text>
              </View>
          </View>
        );

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
    button: {
        alignItems: "center",
        backgroundColor: "#404e5a",
        padding: 10,
        width: 250,
    },
    textInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#AAB7BD",
        color: "#808080"
    },
});
