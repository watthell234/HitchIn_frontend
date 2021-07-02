import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

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
      console.log(selectedItems[itemName])

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

        pickup_list.map((item) => {
          pickup_picker_items.push({label:item.location_name, value:item.location_name.toLowerCase()})
          console.log(pickup_picker_items)
        })



        // pickup_list.map((item, index)=> {
        //   pickup_picker_items.push(<Picker.Item key={index} label={item.location_name} value={item.location_name}/>)
        // })

        dropoff_list.map((item) => {
          dropoff_picker_items.push({label:item.location_name, value:item.location_name.toLowerCase()})
          console.log(dropoff_picker_items)
        })

        // dropoff_list.map((item, index)=> {
        //   dropoff_picker_items.push(<Picker.Item key={index} label={item.location_name} value={item.location_name}/>)
        // })

        this.setState({
          pickup_list: pickup_picker_items,
          dropoff_list: dropoff_picker_items
        });

      })
      .catch((error) => {
        console.log(error)
      })
      console.log(this.pickup_list)
    }

    render() {
      const { pickup_list, dropoff_list } = this.state;
      const placeholder = {
                            label: 'Pick-up',
                            value: null,
                            color: 'gray',
                          };
        return (
        <View style={styles.container}>
            <LogOut navigation={this.props.navigation}/>
            <Text style={styles.title}
                  category='h1'>Port Authority {'\n'}Carpool Route</Text>
                      <Text>Pickup</Text>
                      <RNPickerSelect
                            style={{
                              ...pickerSelectStyles,
                              iconContainer: {
                              top: 10,
                              right: 12,
                            },
                          }}
                            placeholder={placeholder}
                            onValueChange={(itemValue) => this.onPickerSelect("pickup_location", itemValue)}
                            items={pickup_list}
                            useNativeAndroidPickerStyle={false}
                      />

                      <Text>Drop-off</Text>
                      <RNPickerSelect
                            style={{
                              ...pickerSelectStyles,
                              iconContainer: {
                              top: 10,
                              right: 12,
                            },
                          }}
                            placeholder={placeholder}
                            onValueChange={(value) => this.onPickerSelect("dropoff_location", value)}
                            items={dropoff_list}
                            useNativeAndroidPickerStyle={false}
                      />
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.handleSubmit()}}>
                      <Text style={{color: "#FFFFFF"}}>Next</Text>
                  </TouchableOpacity>
      </View>
              )
    }
}

const pickerSelectStyles = StyleSheet.create({
inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    // textColor: 'gray',
    backgroundColor: 'white',
    textDecorationColor: 'white'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white'
  }
});
