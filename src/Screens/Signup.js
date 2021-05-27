import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http, getAxios } from './constants/hitchBackendapi';
import { Checkbox } from 'react-native-paper';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: {},
          errors: {}
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name, value) {
        let input = this.state.input;

        input[name] = value;

        this.setState({
          input
        })

    }

    handleSubmit(event){
      if(this.validate()){

      }
    }

    validate() {
      let input = this.state.input;
      let errors = {};
      let isValid = true;

      if (!input['phoneNumber']) {
        isValid = false;
        errors['phoneNumber'] = "Not a valid phone number."
      }

    }

    // handleCheckBox = () => {
    //     this.setState({
    //         checked: !this.state.checked
    //         }
    //     )
    // }

    async storeToken(user, token) {
      try {
        await AsyncStorage.setItem("userId", JSON.stringify(user));
        await AsyncStorage.setItem("authToken", JSON.stringify(token));

      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    onSignUp() {
        const {accountCreate, phoneNumber, firstName, lastName, email, password, checked} = this.state;
        console.log(checked);
        if (!accountCreate) {
            http.post('/sign-up', {phoneNumber, firstName, lastName, email, password, checked})
            .then((response) => this.storeToken(response.data.id, response.data.auth_token))
            .then(() => this.setState({accountCreate: true}))
            .then(() => checked ? this.props.navigation.navigate('CarForm') : this.props.navigation.navigate('CreateProfile'))
            .catch((err) => console.log(err))

        }

    }

    checkPassword(password) {
      passwordCheck = this.state.password == password;
      this.setState({
        passwordCheck: passwordCheck
      })
    }

    render() {
        const {accountCreate} = this.state;
        return (
          <View style={styles.container}>
              <Text style={styles.title}
                category='h1'>Sign Up
              </Text>
              <View>

                  <TextInput
                      keyboardType="phone-pad"
                      maxLength={10}
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('phoneNumber', value)}
                      placeholder="Mobile Phone Number"
                      value={this.state.input.phoneNumber}
                      onBlur={Keyboard.dismiss}
                  />

                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('firstName', value)}
                      value={this.state.input.firstName}
                      placeholder="First Name"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('lastName', value)}
                      value={this.state.input.lastName}
                      placeholder="Last Name"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('email', value)}
                      value={this.state.input.email}
                      placeholder="Email"
                      onBlur={Keyboard.dismiss}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('password', value)}
                      value={this.state.input.password}
                      placeholder="Password"
                      onBlur={Keyboard.dismiss}
                      secureTextEntry={true}
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('confirmPassword', value)}
                      value={this.state.input.confirmPassword}
                      placeholder="Confirm Password"
                      onBlur={Keyboard.dismiss}
                      secureTextEntry={true}
                  />
                  {/*
                  <Checkbox.Item
                    disabled = {!this.state.checked}
                    status={'checked'}
                    onPress={() => this.setState({checked: !checked})}
                    color='black'
                    label='isDriver'
                    disabled = {!this.state.checked}
                    // labelStyle={styles.textInput}
                    status={'checked'}
                    onPress={this.handleCheckBox}
                    color='#404e5a'
                  />
                  */}
                  </View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={this.handleSubmit}>
                      <Text style={{color: "#FFFFFF", fontSize:20}}>Next</Text>
                  </TouchableOpacity>
                  <Text> Account Creation: {accountCreate ? 'Successful' : 'Fail'}</Text>
          </View>
        );

    }
}
