import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http,  getAxios, http_jwt } from './constants/hitchBackendapi';
import { styles } from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOut from '../Buttons/LogOut.js';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null
    }
  }
  componentDidMount() {
    this.getUserInfo();
    this.setState({
    })
    }

  async getUserInfo() {
      const userId = await AsyncStorage.getItem("userID");
      const authToken = await AsyncStorage.getItem('authToken');
      console.log(parseInt(userId.replace(/['"]+/g, '')));
      http.get(`/user/${parseInt(userId.replace(/['"]+/g, ''))}`)
      .then((response) => this.setState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        email: response.data.email})
    )
  }

    render() {
      const {phoneNumber, firstName, lastName, email} = this.state
      return (
        <View style={styles.profileContainer}>
        <LogOut navigation={this.props.navigation}/>
        <Text style={styles.title}
          category='h1'>Profile
        </Text>
        <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50}}
        source={{uri:'https://lh3.googleusercontent.com/a-/AOh14Gicy9B_XxvruvQqYk4qc9woNsGvRMSNGya1g71V=s100'}}
        />
        <TextInput
          style={styles.title}
          value={firstName + " " +lastName}
        />
        <TextInput
          value={phoneNumber}
        />
        <TextInput
          value= {email}
        />
        <TextInput
          value='Password'
        />
        </View>

    );
  }
}
