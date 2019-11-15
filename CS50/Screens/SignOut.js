import * as React from "react";
import { AsyncStorage, Alert } from "react-native";
import firebase from "firebase";
import "../support/links";

const GithubStorageKey = "@Expo:GithubToken";

async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert("Error: " + message);
  }
}

export default class SignOut extends React.Component {
  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () =>
      this.SignOutAlert()
    );
  }
  componentWillUnmount() {
    this.subs.remove();
  }
  notSignOut() {
    global.currentScreenIndex = 0;
    this.props.navigation.goBack(null);
  }
  isSignOut() {
    global.currentScreenIndex = 0;
    signOutAsync(this.props.navigation.navigate("AppIntro"));
  }

  SignOutAlert() {
    Alert.alert("Are You Sure?", "", [
      {
        text: "Cancel",
        onPress: () => this.notSignOut(),
        style: "cancel"
      },
      {
        text: "YES",
        onPress: () => this.isSignOut()
      }
    ]);
  }

  render() {
    return null;
  }
}
