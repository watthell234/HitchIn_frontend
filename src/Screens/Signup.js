import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http } from './constants/hitchBackendapi';
import { Checkbox } from 'react-native-paper';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-community/async-storage';

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

    handleCheckBox = () => {
        this.setState({
            checked: !this.state.checked
            }
        )
    }

    async storeToken(user) {
      try {
        await AsyncStorage.setItem("userId", JSON.stringify(user));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }


    onSignUp() {
        const {accountCreate, phoneNumber, firstName, lastName, email, password, checked} = this.state;
        console.log(checked);
        if (!accountCreate) {
            http.post('/sign-up', {phoneNumber, firstName, lastName, email, password, checked})
            .then((response) => this.storeToken(response.data.id))
            .then(() => this.setState({accountCreate: true}))
            .then(() => checked ? this.props.navigation.navigate('CarForm') : this.props.navigation.navigate('CreateProfile'))
            .catch((err) => console.log(err))

        }

    }

    render() {
        const {accountCreate} = this.state;
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
                    disabled = {!this.state.checked}
                    status={'checked'}
                    onPress={() => this.setState({checked: !checked})}
                    color='black'
                    label='isDriver'
                    disabled = {!this.state.checked}
                    labelStyle={styles.textInput}
                    status={'checked'}
                    onPress={this.handleCheckBox}
                    color='#404e5a'
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
