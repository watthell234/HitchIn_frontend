import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container: {
      flex: 1,
      backgroundColor: '#AAB7BD',
      alignItems: 'center',
      justifyContent: 'space-evenly',
  },
  title: {
      marginBottom: 20,
      fontSize: 18,
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
      backgroundColor: "#FFFFFF",
      borderWidth: 14,
      borderColor: "#AAB7BD",
      color: "#000000",
      height: 64,
      width: 250,
      paddingLeft: 25,
      borderRadius: 20,
  },
});

export { styles }
