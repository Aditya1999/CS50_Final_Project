import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import AppIntro from "./Screens/AppIntro";
import Login from "./Screens/Login";
import Home from "./Screens/Home";

const AppNavigator = createStackNavigator(
  {
    AppIntro: { screen: AppIntro },
    Login: { screen: Login },
    Home: { screen: Home }
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

const App = createAppContainer(AppNavigator);

// App's Firebase configuration
var firebaseConfig = {
  apiKey: "***",
  authDomain: "***",
  databaseURL: "***",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "***",
  appId: "***",
  measurementId: "***"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default App;
