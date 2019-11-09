import * as React from "react";
import {
  Image,
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StatusBar
} from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";
import getGithubTokenAsync from "../support/getGithubTokenAsync";
import GithubButton from "../components/GithubButton";

const GithubStorageKey = "@Expo:GithubToken";
const { width, height } = Dimensions.get("window");

async function signInAsync(token) {
  try {
    if (!token) {
      const token = await getGithubTokenAsync();
      if (token) {
        await AsyncStorage.setItem(GithubStorageKey, token);
        return signInAsync(token);
      } else {
        return;
      }
    }
    state = { isSignedIn: true };
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(credential);
  } catch ({ message }) {
    alert(message);
  }
}

async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert("Error: " + message);
  }
}

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey);
  if (token) {
    console.log("Sign in with token", token);
    return signInAsync(token);
  }
}

export default class Login extends React.Component {
  state = { isSignedIn: false, assetsLoaded: false };

  async componentDidMount() {
    this.setupFirebaseAsync();
    await Font.loadAsync({
      "Monda-Bold": require("../assets/fonts/Monda/Monda-Bold.ttf")
    });
    this.setState({ assetsLoaded: true });
  }

  setupFirebaseAsync = async () => {
    firebase.auth().onAuthStateChanged(async auth => {
      const isSignedIn = !!auth;
      this.setState({ isSignedIn });
      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  };

  render() {
    const { assetsLoaded } = this.state;

    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};

      return (
        <View style={styles.container}>
          <Image source={{ uri: user.photoURL }} style={styles.image} />
          <Text style={styles.paragraph}>Welcome {user.displayName}</Text>
          <Text style={styles.paragraph} onPress={() => signOutAsync()}>
            Logout
          </Text>
        </View>
      );
    } else {
      if (assetsLoaded) {
        return (
          <ScrollView>
            <View style={styles.container}>
              <View>
                <Text style={styles.titleText}>YOUR ACCOUNT FOR</Text>
                <Text style={styles.titleText1}>CS50</Text>
              </View>
              <View style={styles.gitbutton}>
                <GithubButton onPress={() => signInAsync()} />
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center"
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    resizeMode: "contain"
  },
  flexone: {
    flex: 1
  },
  gitbutton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height - 250
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  titleText: {
    fontFamily: "Monda-Bold",
    fontSize: width / 14,
    marginTop: 70
  },
  titleText1: {
    fontFamily: "Monda-Bold",
    fontSize: width / 14,
    textAlign: "center"
  }
});
