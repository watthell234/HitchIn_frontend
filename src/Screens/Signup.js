import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http, getAxios } from './constants/hitchBackendapi';
import { Checkbox } from 'react-native-paper';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: {},
          errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      console.log(this.props.navigation.state.params.email);
    }

    handleChange(name, value) {
        let input = this.state.input;

        input[name] = value;

        this.setState({
          input
        });

    }

    handleSubmit(event){

      if(this.validate()){
        this.onSignUp();
      }
    }

    validate() {

      let input = this.state.input;
      let errors = {};
      let isValid = true;

      //this checks if phone number only contains numbers
      let phoneRegExp = /^[0-9]+$/;

      //this chekcs if name only contains letters
      let nameRegExp = /^[a-z]+$/i;

      //this checks if password only contains letters and numbers
      let passwordRegExp = /^[a-z0-9]+$/i;

      //this checks if email is valid
      let emailRegExp = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

      if (!input['phoneNumber'] || !phoneRegExp.test(input['phoneNumber']) || input['phoneNumber'].length != 10) {
        isValid = false;
        errors['phoneNumber'] = "Not a valid phone number."
      }

      if (!input['firstName'] || !nameRegExp.test(input['firstName'])){
        isValid = false;
        errors['firstName'] = "Invalid first name."
      }

      if (!input['lastName'] || !nameRegExp.test(input['lastName'])){
        isValid = false;
        errors['lastName'] = "Invalid last name."
      }

      if(!input['email'] || !emailRegExp.test(input['email'])){
        isValid = false;
        errors['email'] = "Invalid email."
      }

      if(!input['password'] || !passwordRegExp.test(input['password']) || input['password'].length < 10){
        isValid = false;
        errors['password'] = "Password must be: \n • At least 10 characters \n • Only contain letters and numbers"
      }

      if(!input['confirmPassword'] || input['password'] != input['confirmPassword']){
        isValid = false;
        errors['confirmPassword'] = "Please confirm your password.";
      }

      //warning: setState is asynchronous
      this.setState({
        errors
      })

      return isValid;
    }

    async storeToken(user, token) {
      try {
        await AsyncStorage.setItem("userID", JSON.stringify(user));
        await AsyncStorage.setItem("authToken", JSON.stringify(token));

      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    onSignUp() {

        const {phoneNumber, firstName, lastName, email, password} = this.state.input;

        http.post('/sign-up', {phoneNumber, firstName, lastName, email, password})
        .then((response) => this.storeToken(response.data.id, response.data.auth_token))
        .then(() => {this.props.navigation.navigate('LoggedIn')})
        .catch((error) => {
          if(error.response){
            //401
            console.log(error.response);

            //needs more work
            let errors = this.state.errors;
            errors['phoneNumber'] = "phone number already exists";
            errors['email'] = "email already exists";
            this.setState({
              errors
            })

          } else if (error.request){
            console.log(error.request);
          } else {
            console.log(error.message);
          }
        });

      }


    checkPassword(password) {
      passwordCheck = this.state.password == password;
      this.setState({
        passwordCheck: passwordCheck
      })
    }

    render() {
        // const {accountCreate} = this.state;
        return (
          <View style={styles.container}>
              <Text style={styles.title}
                category='h1'>Sign Up
              </Text>
              <View>

                  <TextInput
                      keyboardType="number-pad"
                      maxLength={10}
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('phoneNumber', value)}
                      placeholder="Mobile Phone Number"
                      value={this.state.input.phoneNumber}
                      onBlur={Keyboard.dismiss}
                  />
                  <Text> {this.state.errors['phoneNumber']} </Text>

                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('firstName', value)}
                      value={this.state.input.firstName}
                      placeholder="First Name"
                      onBlur={Keyboard.dismiss}
                  />
                  <Text> {this.state.errors['firstName']} </Text>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('lastName', value)}
                      value={this.state.input.lastName}
                      placeholder="Last Name"
                      onBlur={Keyboard.dismiss}
                  />
                  <Text> {this.state.errors['lastName']} </Text>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('email', value)}
                      value={this.state.input.email}
                      placeholder="Email"
                      onBlur={Keyboard.dismiss}
                  />
                  <Text> {this.state.errors['email']} </Text>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('password', value)}
                      value={this.state.input.password}
                      placeholder="Password"
                      onBlur={Keyboard.dismiss}
                      secureTextEntry={true}
                  />
                  <Text> {this.state.errors['password']} </Text>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => this.handleChange('confirmPassword', value)}
                      value={this.state.input.confirmPassword}
                      placeholder="Confirm Password"
                      onBlur={Keyboard.dismiss}
                      secureTextEntry={true}
                  />
                  <Text> {this.state.errors['confirmPassword']} </Text>

                  </View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={this.handleSubmit}>
                      <Text style={{color: "#FFFFFF", fontSize:20}}>Next</Text>
                  </TouchableOpacity>
          </View>
        );

    }
}
