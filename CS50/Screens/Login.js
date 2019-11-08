import * as React from "react";
import {
  Image,
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import firebase from "firebase";
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
  state = { isSignedIn: false };

  componentDidMount() {
    this.setupFirebaseAsync();
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
      return (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.titleText}>YOUR ACCOUNT FOR</Text>
              <Text style={styles.titleText1}>BUCKET LIST</Text>
            </View>
            <View style={styles.gitbutton}>
              <GithubButton onPress={() => signInAsync()} />
            </View>
          </View>
        </ScrollView>
      );
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
    fontFamily: "Baskerville",
    fontWeight: "bold",
    fontSize: width / 15,
    marginTop: 70
  },
  titleText1: {
    fontFamily: "Baskerville",
    fontSize: width / 15,
    fontWeight: "bold",
    textAlign: "center"
  }
});
