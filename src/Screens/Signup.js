import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import axios from 'axios';

const serverUrl = 'https://hitchin-server.herokuapp.com';
const http = axios.create({
    baseURL: serverUrl,
});

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,
            firstName: null,
            lastName: null,
            email: null,
            password: null
        }
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(phone_number) {
        this.setState({phone_number})
    }
    onSignUp() {
        const {accountCreate, phone_number, firstName, lastName, email, password} = this.state;
        if (!accountCreate) {
            http.post('/sign_up', {phone_number, firstName, lastName, email, password})
            .then(() => this.setState({accountCreate: true})).then(() => this.props.navigation.navigate('CreateProfile'))
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
                    value={this.state.phone_number}
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
