import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import { styles } from './styles/styles';

export default class CarInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
    }
  };

  handleTextChange(name, value){
    let input = this.state.input;
    input[name] = value;

    this.setState({
      input
    });
  }

  handleSubmit() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.title}
                  category='h1'>Car Info</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_maker", value)}
                placeholder="Car Maker"
                value={this.state.input.car_maker}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_color", value)}
                placeholder="Car Color"
                value={this.state.input.car_color}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("car_plate", value)}
                placeholder="Car Plate"
                value={this.state.input.car_plate}
                onBlur={Keyboard.dismiss}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => this.handleTextChange("ezpass_tag", value)}
                placeholder="EZpass Tag"
                value={this.state.input.ezpass_tag}
                onBlur={Keyboard.dismiss}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmit()}>
                <Text style={{color: "#FFFFFF"}}>Create QR Code</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}
