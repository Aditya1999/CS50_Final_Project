import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firebase from 'firebase';
import Login from './Screens/Login';
//import LoginTest from './Screens/LoginTest';


const AppNavigator = createStackNavigator({
  //LoginTest: {screen: LoginTest},
  Login: {screen: Login},
},
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header:null,
      gesturesEnabled: false,
    },
  }
);


const App = createAppContainer(AppNavigator);


// App's Firebase configuration
var firebaseConfig = {
  apiKey: "***",
  authDomain: "***",
  databaseURL: "***",
  projectId: "***f",
  storageBucket: "***",
  messagingSenderId: "***",
  appId: "***",
  measurementId: "***"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default App;