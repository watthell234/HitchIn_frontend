import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, Keyboard, TouchableOpacity, Picker} from 'react-native';
import { styles } from './styles/styles'
import { http, getAxios } from './constants/hitchBackendapi';

export default class CarpoolRouteScreen extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        pickup_list: {},
        dropoff_list: {}
      };
      this.get_location_lists();
    }

    get_location_lists() {

      http.get('/routes')
      .then((response) => {
        this.setState({
          pickup_list: response.data.pickup_list,
          dropoff_list: response.data.dropoff_list
        });
      })
      .catch((error) => {
        console.log(error)
      })

    }

    render() {

        const pickup_list = Object.values(this.state.pickup_list);
        const dropoff_list = Object.values(this.state.dropoff_list);

        const pickup_picker_items = [];
        const dropoff_picker_items = [];

        pickup_list.map((item, index)=> {
          pickup_picker_items.push(<Picker.Item label={item} value={item}/>)
        })

        dropoff_list.map((item, index)=> {
          dropoff_picker_items.push(<Picker.Item label={item} value={item}/>)
        })

        return (
        <View style={styles.container}>
            <Text style={styles.title}
                  category='h1'>Port Authority {'\n'}Carpool Route</Text>
                  <View style={styles.routeOrientation}>
                      <Text>Pickup</Text>
                      <Picker>
                        {pickup_picker_items}
                      </Picker>
                      {/* TODO: change TextInputs to Pickers when I have a MacBook to add native component to iOS  */}
                  </View>
                  <View style={styles.routeOrientation}>
                      <Text>Drop-off</Text>
                      <Picker>
                        {dropoff_picker_items}
                      </Picker>
                  </View>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => {this.props.navigation.navigate('SignUp')}}>
                      <Text style={{color: "#FFFFFF"}}>Next</Text>
                  </TouchableOpacity>
      </View>
              )
    }
}
