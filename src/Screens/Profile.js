import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http_jwt } from './constants/hitchBackendapi';
import { styles } from './styles/styles';

export default class UserProfile extends React.Component {
    render() {
      return (
        <View style={styles.container}>
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
        </View>
    );
  }
}
