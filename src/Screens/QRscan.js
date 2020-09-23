import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { http } from './constants/hitchBackendapi';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window')
const qrSize = width * 0.7


class QRReader extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      hasPermission: null,
      scanned: false,
    }
  }

   componentDidMount() {
      this.getPermission();
    }

  async getPermission() {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({hasPermission: status === 'granted'});
      } catch (error) {
      console.log("Something went wrong", error);
        }
    }

    handleBarCodeScanned = ({ type, data }) => {
      data = JSON.parse(data)
      // alert(`Bar code with type ${type} and Slug id: ${data.slug_id} has been scanned!`);
      let carQr = data.car_qr
      http.post('/checkin', {carQr})
      .then(() => this.props.navigation.navigate('Position'))
      .catch((err) => console.log(err))

    };



  render() {
   const { hasPermission, scanned } = this.state;

   if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text style={styles.description}>HitchIn</Text>
        <Image
          style={styles.qr}
          source={require('./assets/qr-scanner.png')}
        />
      </BarCodeScanner>

      {scanned && <Button title={'Tap to Scan Again'}
      onPress={() => this.setState({scanned: false})} />}
        <Text>QR</Text>
      </View>
  );
}

}

class StartRide extends React.Component {
  render() {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {}}>
          <Text style={{color: "#FFFFFF"}}>Start Trip</Text>
      </TouchableOpacity>
    </View>
  );
  }
}


const Tab = createBottomTabNavigator();

class MyTabs extends React.Component {
  render() {
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="QRReader">
      <Tab.Screen name="QR Scan" component={QRReader} />
      <Tab.Screen name="Drive" component={StartRide} />
    </Tab.Navigator>
    </NavigationContainer>
  );
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
    },
    qr: {
      marginTop: '20%',
      marginBottom: '20%',
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.09,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    cancel: {
      fontSize: width * 0.05,
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#404e5a",
        padding: 10,
        width: 250,
     },
});
