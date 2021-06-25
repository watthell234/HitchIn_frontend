import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { http_jwt } from './constants/hitchBackendapi';
import { styles } from './styles/styles';

export default class UserProfile extends React.Component {
    render() {
      return (
        <View style={styles.profileContainer}>
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
          value='Julius Gonzalez'
        />
        <TextInput
          value='+1 (646)285-1062'
        />
        <TextInput
          value='Miles in Carpool: 10'
        />
        <TextInput
          value='Password'
        />
        <Text
          style={styles.secondaryTitle}
          category='h2'>My Car
        </Text>
        <TextInput
          value='Toyota'
        />
        <TextInput
          value='Blue'
        />
        <TextInput
          value='WCB-96X'
        />
        <TextInput
          value='8273923767819'
        />
        </View>

    );
  }
}
