import * as React from "react";
import { Image, Text, View, AsyncStorage, StyleSheet } from "react-native";
import firebase from "firebase";
import getGithubTokenAsync from "./getGithubTokenAsync";
import GithubButton from "./components/GithubButton";

const GithubStorageKey = "@Expo:GithubToken";

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

export default class App extends React.Component {
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
        <View style={styles.container}>
          <GithubButton onPress={() => signInAsync()} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    resizeMode: "contain"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
