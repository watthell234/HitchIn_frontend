import { createAppContainer } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import InitScreen from './src/Screens/InitPage';
import SignUpScreen from './src/Screens/Signup';
import Navigate from './src/Screens/NavigatingScreen';
import CarpoolRoute from './src/Screens/CarpoolRoute';
import LoginScreen from './src/Screens/LoginPage';
import CreateProfileScreen from './src/Screens/CreateProfile';
import Position from './src/Screens/Position';
import PairingScreen from './src/Screens/Pairing';
import QRReaderScreen from './src/Screens/QRscan';
import CarForm from './src/Screens/CarForm';

const MainNavigator = createStackNavigator({
    Init: {screen: InitScreen,},
    SignUpScreen: {screen: SignUpScreen,},
    CarpoolRoute: {screen: CarpoolRoute,},
    Login: {screen: LoginScreen,},
    CreateProfile: {screen: CreateProfileScreen,},
    Position: {screen: Position,},
    Pairing: { screen: PairingScreen, },
    Navigate: { screen: Navigate, },
    QRScan: { screen: QRReaderScreen, },
    CarForm: { screen: CarForm, }
},
    {
        initialRouteName: "Init"
    }
);

const App = createAppContainer(MainNavigator);

export default App;
