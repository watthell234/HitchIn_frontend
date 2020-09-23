import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: '#AAB7BD',
        alignItems: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        fontSize: 32,
        color: '#404e5a'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#404e5a",
        padding: 10,
        width: 250,
    },
    textInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 14,
        borderColor: "#AAB7BD",
        color: "#000000",
        height: 64,
        // padding: 24,
    },
});

export { styles }