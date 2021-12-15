import React from 'react';
import {
  StyleSheet, Text, View, Button, TextInput,
  Image, ImageBackground, Keyboard, TouchableOpacity,
  SafeAreaView, ScrollView, ActivityIndicator
} from 'react-native';
import { http, getAxios } from './constants/hitchBackendapi';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PhoneNumberScreen extends React.Component {
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

    //this checks if phone number only contains numbers
    let phoneRegExp = /^[0-9]+$/;

    //this checks if password only contains letters and numbers
    let passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;

    if (!input['phoneNumber'] || !phoneRegExp.test(input['phoneNumber']) || input['phoneNumber'].length != 10) {
      isValid = false;
      errors['phoneNumber'] = "Not a valid phone number."
    }

    if(!input['password'] || !passwordRegExp.test(input['password']) || input['password'].length < 7){
      isValid = false;
      errors['password'] = "Password must be: \n • At least 7 characters \n • Only contain letters and numbers"
    }

    if(!input['confirmPassword'] || input['password'] != input['confirmPassword']){
      isValid = false;
      errors['confirmPassword'] = "Please confirm your password.";
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

    const { phoneNumber, password } = this.state.input;

     this.props.navigation.navigate('UserProfile', {
       phoneNumber: phoneNumber,
       password: password,
       }
     )
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
      keyboardType="phone-pad"
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
      onChangeText={(value) => this.handleChange('password', value)}
      value={this.state.input.password}
      placeholder="Password"
      secureTextEntry={true}
      returnKeyType="next"
      ref={ref => {
            this.passwordRef = ref;
          }}
      onSubmitEditing={() => this.confirmPassRef.focus()}
      />
      <Text> {this.state.errors['password']} </Text>
      <TextInput
      style={styles.textInput}
      onChangeText={(value) => this.handleChange('confirmPassword', value)}
      value={this.state.input.confirmPassword}
      placeholder="Confirm Password"
      ref={ref => {
            this.confirmPassRef = ref;
          }}
      onBlur={Keyboard.dismiss}
      secureTextEntry={true}
      />
      <Text> {this.state.errors['confirmPassword']} </Text>


      {
      this.state.clicked?
      <ActivityIndicator size="small" color="#404e5a" />
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
