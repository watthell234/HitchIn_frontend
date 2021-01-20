import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { http } from './constants/hitchBackendapi';

const { width } = Dimensions.get('window')
const qrSize = width * 0.7


export default class QRReader extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      hasPermission: null,
      scanned: false,
      userId: null
    }
  }

   componentDidMount() {
      this.getPermission();
      this.getToken();
    }

  async getPermission() {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({hasPermission: status === 'granted'});
      } catch (error) {
      console.log("Something went wrong", error);
        }
    }

    async getToken(user, token) {
      try {
        let getUserId = await AsyncStorage.getItem("userId");
        let userId = JSON.parse(getUserId);
        let getToken = await AsyncStorage.getItem("token");
        let token = JSON.parse(getToken);
        console.log(userId);
        this.setState({userId: userId});
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    handleBarCodeScanned = ({ type, data }) => {
      console.log(data)
      data = JSON.parse(data)
      // alert(`Bar code with type ${type} and Car QR: ${data.car_qr} has been scanned!`);
      let carQr = data.car_qr
      http.post('/checkin', { ,carQr})
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
