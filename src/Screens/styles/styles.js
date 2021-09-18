import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safearea:{
    flex: 1
  },
 container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-evenly',
  },
  profileContainer: {
      backgroundColor: 'white',
      alignItems: 'center',
  },
  title: {
      marginBottom: 20,
      fontWeight: 'bold',
      fontSize: 32,
      color: '#404e5a',
      alignSelf: "center"
  },
  paragraph: {
      marginBottom: 20,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#404e5a',
  },
  secondaryTitle: {
      marginBottom: 20,
      fontSize: 14,
      fontWeight: 'bold',
      fontSize: 32,
      color: '#404e5a',
  },
  button: {
      alignItems: "center",
      backgroundColor: "#404e5a",
      padding: 10,
      width: 300,
      borderRadius:8,
  },
  textInput: {
      // backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderBottomColor: "#404E5A",
      borderColor: "white",
      // color: "#000000",
      height: 64,
      width: 250,
      paddingLeft: 25,
      // borderRadius: 20,
  },
});

export { styles }
