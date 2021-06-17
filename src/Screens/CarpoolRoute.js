import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogOut from '../Buttons/LogOut.js';

export default class CarpoolRouteScreen extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        selectedItems: {},
        pickup_list: [],
        dropoff_list: []
      };

    }

    onPickerSelect(itemName, itemValue) {

      let selectedItems = this.state.selectedItems;
      selectedItems[itemName] = itemValue;

      this.setState({
        selectedItems
      });
    }

    async storeLocations() {
      try{
        let pickup = this.state.selectedItems.pickup_location;
        let dropoff = this.state.selectedItems.dropoff_location;
        await AsyncStorage.setItem("pickup", pickup);
        await AsyncStorage.setItem("dropoff", dropoff);
      }catch(error) {
        console.log("Couldn't store locations", error)
      }
    }

    handleSubmit() {
      this.storeLocations();
      this.props.navigation.navigate('RideOrDrive');
    }

    componentDidMount = () => {
      http.get('/routes')
      .then((response) => {

        const pickup_list = response.data.pickup_list;
        const dropoff_list = response.data.dropoff_list;

        const pickup_picker_items = [];
        const dropoff_picker_items = [];

        pickup_list.map((item, index)=> {
          pickup_picker_items.push(<Picker.Item key={index} label={item} value={item}/>)
        })

        dropoff_list.map((item, index)=> {
          dropoff_picker_items.push(<Picker.Item key={index} label={item} value={item}/>)
        })

        this.setState({
          pickup_list: pickup_picker_items,
          dropoff_list: dropoff_picker_items
        });

      })
      .catch((error) => {
        console.log(error)
      })
    }

    render() {
        return (
        <View style={styles.container}>
            <LogOut navigation={this.props.navigation}/>
            <Text style={styles.title}
                  category='h1'>Port Authority {'\n'}Carpool Route</Text>
                  <View style={styles.routeOrientation}>
                      <Text>Pickup</Text>
                      <Picker
                        selectedValue={this.state.selectedItems.pickup_location}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.onPickerSelect('pickup_location', itemValue)}>
                        {this.state.pickup_list}
                      </Picker>
                  </View>
                  <View style={styles.routeOrientation}>
                      <Text>Drop-off</Text>
                      <Picker
                        selectedValue={this.state.selectedItems.dropoff_location}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.onPickerSelect('dropoff_location', itemValue)}>
                        {this.state.dropoff_list}
                      </Picker>
                  </View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.handleSubmit()}}>
                      <Text style={{color: "#FFFFFF"}}>Next</Text>
                  </TouchableOpacity>
      </View>
              )
    }
}
