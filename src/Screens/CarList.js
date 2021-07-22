import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogOut from '../Buttons/LogOut.js';

export default function CarListScreen({navigation}) {

  const [selectedCar, setSelectedCar] = useState(null);
  const [carList, setCarList] = useState(null);
  const placeholder = {
                        label: 'Select Car',
                        value: null,
                        color: 'gray',
                      };
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
          car_picker_items.push({label: item.license_plate, value: item.car_id})
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
      // console.log(selectedCar);
      storeCarID(selectedCar);
      navigation.navigate('DriverTrip');
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
      {carList ?
        <RNPickerSelect
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                top: 10,
                right: 12,
              },
            }}
              placeholder={placeholder}
              onValueChange={(itemValue) => onPickerSelect(itemValue)}
              items={carList}
              useNativeAndroidPickerStyle={false}
        /> :
        <Text> Waiting on your car list...</Text>
      }
      <TouchableOpacity
      style={styles.button}
      onPress={() => {handleAddCar()}}>
      <Text style={{color: "#FFFFFF"}}>Add Car</Text>
      </TouchableOpacity>
      </View>
      {selectedCar ?
      <TouchableOpacity
      style={styles.button}
      onPress={() => {handleSubmit()}}>
      <Text style={{color: "#FFFFFF"}}>Next</Text>
      </TouchableOpacity>
      :
      <Text> Please, select a car. </Text>
      }
      </View>
    )
}
