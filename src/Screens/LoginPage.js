import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';

const serverUrl = 'http://192.168.1.158:5000';
const http = axios.create({
    baseURL: serverUrl,
});

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,
            password: null
        }
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(phone_number) {
        this.setState({phone_number})
    }

    onLogin() {
        const {Login, phone_number, password} = this.state;
        if (!Login) {
            http.post('/login', {phone_number, password})
            .then(() => this.setState({Login: true})).then(() => this.props.navigation.navigate('Pairing'))
            .catch((err) => console.log(err))

        }
    }
    render() {
        const {Login} = this.state;
        return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}
                      category='h1'>Welcome back!</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.handleNameChange}
                    placeholder="Mobile Phone Number"
                    value={this.state.phone_number}
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.onLogin()}}>
                    <Text style={{color: "#FFFFFF"}}>Login</Text>
                </TouchableOpacity>
                <Text> Login: {Login ? 'Successful' : 'Fail'}</Text>
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
        borderColor: "#AAB7BD"
    },
});
