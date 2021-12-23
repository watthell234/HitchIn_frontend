import React from 'react';
import {
  StyleSheet, Text, View, Button, TextInput,
  Image, ImageBackground, Keyboard, TouchableOpacity,
  SafeAreaView, ScrollView
} from 'react-native';
import { http, getAxios } from './constants/hitchBackendapi';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      clicked: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    if (this.props.navigation.state.params) {
      let input = this.state.input;
      let params = this.props.navigation.state.params
      input['phoneNumber'] = params.phoneNumber;
      input['password'] = params.password;
      input['email'] = params.email;
      input['firstName'] = params.firstName;
      input['lastName'] = params.lastName;
      input['photoUrl'] = params.photoUrl;

      this.setState({ input });
      console.log(this.props.navigation.state.params.email);
      console.log(this.props.navigation.state.params.firstName);
      console.log(this.props.navigation.state.params.lastName);
      console.log(this.props.navigation.state.params.photoUrl);
    }

  }

  handleChange(name, value) {
    let input = this.state.input;

    input[name] = value;

    this.setState({
      input
    });

  }

  handleSubmit(event){

    this.setState({
      clicked: true
    })

    if(this.validate())
    {
      this.onSignUp();
    }
  }

  validate() {

    let input = this.state.input;
    let errors = {};
    let isValid = true;

    //this chekcs if name only contains letters
    let nameRegExp = /^[a-z]+$/i;

    //this checks if email is valid
    let emailRegExp = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

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

    //warning: setState is asynchronous
    this.setState({
      clicked: false,
      errors
    }
  )


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

    const { phoneNumber, firstName, lastName, email, password, photoUrl } = this.state.input;

    http.post('/sign-up', {phoneNumber, firstName, lastName, email, password, photoUrl})
    .then((response) => this.storeToken(response.data.id, response.data.auth_token))
    .then(() => {this.props.navigation.navigate('LoggedIn')})
    .catch((error) => {
      //401
      let status = error.response.status;
      let errors = {};

      console.log(error.response);
      if (status == 401)
      {
        errors['email'] = "email already exists";
      }
      else if(status == 402){
        errors['phoneNumber'] = "phone number already exists";
      }

      this.setState(
        {
          clicked: false,
          errors
        }
      )

    });

  }


  checkPassword(password) {
    passwordCheck = this.state.password == password;
    this.setState(
      {
      passwordCheck: passwordCheck
    }
  )
  }

  render() {

    return (
      <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.paragraph}>
      Please provide your
      </Text>
      <TextInput
      style={styles.textInput}
      onChangeText={(value) => this.handleChange('firstName', value)}
      value={this.state.input.firstName}
      placeholder="First Name"
      returnKeyType="next"
      onSubmitEditing={() => this.lastNameRef.focus()}
      />
      <Text> {this.state.errors['firstName']} </Text>
      <TextInput
      style={styles.textInput}
      onChangeText={(value) => this.handleChange('lastName', value)}
      value={this.state.input.lastName}
      placeholder="Last Name"
      returnKeyType="next"
      ref={ref => {
            this.lastNameRef = ref;
          }}
      onSubmitEditing={() => this.emailRef.focus()}
      />
      <Text> {this.state.errors['lastName']} </Text>
      <TextInput
      style={styles.textInput}
      keyboardType="email-address"
      onChangeText={(value) => this.handleChange('email', value)}
      value={this.state.input.email}
      placeholder="Email"
      returnKeyType="next"
      ref={ref => {
            this.emailRef = ref;
          }}
      onSubmitEditing={() => this.passwordRef.focus()}

      />
      <Text> {this.state.errors['email']} </Text>
      {
      this.state.clicked?
      <TouchableOpacity
      style={styles.button}>
      <Text style={{color: "#FFFFFF", fontSize:20}}>Creating account...</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
      style={styles.button}
      onPress={this.handleSubmit}>
      <Text style={{color: "#FFFFFF", fontSize:20}}>Next</Text>
      </TouchableOpacity>
    }
      </View>
      </ScrollView>
      </SafeAreaView>

    );

  }
}
