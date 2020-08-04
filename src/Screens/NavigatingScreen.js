import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity} from 'react-native';

export default class Navigate extends React.Component {
    render() {
        return (

            <MapView
                style={{width: 1000,
                        height: 1000}}
       initialRegion={{
         latitude: 40.7128,
         longitude: -74.0060,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     />
        );
    }
}
