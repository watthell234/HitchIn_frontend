import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#404e5a'
  },

  title_hitchin: {
    alignSelf: 'center',
  },

  signin_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  signin_button: {
    textDecorationLine: 'underline',
    color: '#0645AD',
    fontSize: 16,
    paddingBottom: 2,
  },

  row: {
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
  },

  signup_button: {
    alignItems: "center",
    backgroundColor: "#404e5a",
    padding: 10,
    width: 300,
    borderRadius:8,
  },

  hitchin_logo: {
    width:500,
    height: 350,
  },

});

export default styles;
