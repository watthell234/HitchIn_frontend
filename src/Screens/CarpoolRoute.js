import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    handleSubmit() {
      this.props.navigation.navigate('RideOrDrive');
    }

    async handleLogout() {
      try {
        await AsyncStorage.clear();
      } catch(e) {
        console.log(e);
      }

      console.log("logged out");

      this.props.navigation.navigate('Init');
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => {this.handleLogout()}}>
                <Text style={{color: "#FFFFFF"}}>Log Out</Text>
            </TouchableOpacity>
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
                      {/* TODO: change TextInputs to Pickers when I have a MacBook to add native component to iOS  */}
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
