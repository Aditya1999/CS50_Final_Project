import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import "./support/Api";
import AppIntro from "./Screens/AppIntro";
import Login from "./Screens/Login";
import NavigationDrawer from "./support/NavigationDrawer";

const AppNavigator = createStackNavigator(
  {
    AppIntro: { screen: AppIntro },
    Login: { screen: Login },
    NavigationDrawer: { screen: NavigationDrawer }
  },
  {
    initialRouteName: "NavigationDrawer",
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

const App = createAppContainer(AppNavigator);

// App's Firebase configuration
var firebaseConfig = {
  apiKey: FirebaseApiKey,
  authDomain: FirebaseAuthDomain,
  databaseURL: FirebaseDatabaseURL,
  projectId: FirebaseProjectId,
  storageBucket: FirebaseStorageBucket,
  messagingSenderId: FirebaseMessagingSenderId,
  appId: FirebaseAppId,
  measurementId: FirebaseMeasurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default App;
