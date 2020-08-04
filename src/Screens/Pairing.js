import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default class PairingScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>"Loading: 0 out of 3"</Text
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AAB7BD',
        alignItems: 'center',
  },
    button: {
      alignItems: "center",
      backgroundColor: "#404e5a",
      padding: 10,
      width: 250,
    },

     }
)
