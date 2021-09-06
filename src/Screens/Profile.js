import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, SafeAreaView}
from 'react-native';
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
      phoneNumber: null,
      photoUrl: null,
      TextInputDisableStatus: false
    }
  }
  componentDidMount() {
    this.getUserInfo();
    this.setState({
    })
  }

  onEditProfile = () => {
    this.setState({TextInputDisableStatus: !this.state.TextInputDisableStatus})
    console.log(this.state.TextInputDisableStatus)
  }

  async getUserInfo() {
    const userId = await AsyncStorage.getItem("userID");
    const authToken = await AsyncStorage.getItem('authToken');
    http.get(`/user/${userId}`)
    .then((response) => this.setState({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      phoneNumber: response.data.phoneNumber,
      email: response.data.email,
      photoUrl: response.data.photoUrl
    }
  )
)
}

render() {
  const {phoneNumber, firstName, lastName, email, TextInputDisableStatus, photoUrl} = this.state
  let uri;
  if (photoUrl) {
    uri = {uri: photoUrl.toString()}
  } else {
    uri = {uri: 'https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-vector-id1209654046'}
  }
  let buttonText;
  if (TextInputDisableStatus) {
   buttonText = <Text style={{color: "#FFFFFF", fontSize:20}}>Save</Text>
 } else {
   buttonText = <Text style={{color: "#FFFFFF", fontSize:20}}>Update Profile</Text>
 }
  return (
    <SafeAreaView>
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
      source={uri}
      />
      <TextInput
      style={styles.title}
      value={firstName}
      onChangeText={(firstName) => this.setState({firstName}) }
      editable={TextInputDisableStatus}
      />
      <TextInput
      style={styles.title}
      value={lastName}
      onChangeText={lastName => this.setState({lastName}) }
      editable={TextInputDisableStatus}
      />
      <TextInput
      value={phoneNumber}
      onChangeText={phoneNumber => this.setState({phoneNumber}) }
      editable={TextInputDisableStatus}
      />
      <TextInput
      value={email}
      onChangeText={(email) => this.setState({email})}
      editable={TextInputDisableStatus}
      />
      <TextInput
      value='Password'
      editable={TextInputDisableStatus}
      secureTextEntry={true}
      />
      <TouchableOpacity
      style={styles.button}
      onPress={this.onEditProfile}>
      {buttonText}
      </TouchableOpacity>
      </View>
      </SafeAreaView>

    );
  }
}
