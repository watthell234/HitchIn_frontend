import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogOut from '../Buttons/LogOut.js';

export default function CarListScreen({navigation}) {

  const [selectedCar, setSelectedCar] = useState(null);
  const [carList, setCarList] = useState([]);

    React.useEffect(() => {
      getCarList();
    },[]);

    async function getCarList() {

      const userID = await AsyncStorage.getItem("userID");

      http.post('/car_list', {userID})
      .then((response) => {

        const car_list = response.data.car_list;
        const car_picker_items = [];

        car_list.map((item, index)=> {
          car_picker_items.push(<Picker.Item key={index} label={item.license_plate} value={item.car_id}/>)
        })

        setCarList(car_picker_items);
      })
      .catch((error) => {
        console.log(error)
      })
    }

    async function storeCarID(carID) {
      await AsyncStorage.setItem("carID", JSON.stringify(carID));
    }

    function onPickerSelect(itemValue) {

      setSelectedCar(itemValue);
    }

    function handleSubmit() {
      storeCarID(selectedCar);
      navigation.navigate('Trip');
    }

    function handleAddCar(){
      navigation.navigate('CarInfo');
    }

    return (
      <View style={styles.container}>
      <LogOut navigation={navigation}/>
      <Text style={styles.title}
      category='h1'>Car List</Text>
      <View style={styles.routeOrientation}>
      <Text>Pickup</Text>
      <Picker
      selectedValue={selectedCar}
      style={{ height: 50, width: 150 }}
      onValueChange={(itemValue, itemIndex) => onPickerSelect(itemValue)}>
      {carList}
      </Picker>
      </View>
      <TouchableOpacity
      style={styles.button}
      onPress={() => {handleAddCar()}}>
      <Text style={{color: "#FFFFFF"}}>Add Car</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      onPress={() => {handleSubmit()}}>
      <Text style={{color: "#FFFFFF"}}>Next</Text>
      </TouchableOpacity>
      </View>
    )
}
