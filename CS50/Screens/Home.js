import * as React from "react";
import { Image, Text, View, AsyncStorage, StyleSheet } from "react-native";
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

export default class Home extends React.Component {
  render() {
    const user = firebase.auth().currentUser || {};

    return (
      <View style={styles.container2}>
        <Image source={{ uri: user.photoURL }} style={styles.image} />
        <Text style={styles.paragraph}>Welcome {user.displayName}</Text>
        <Text
          style={styles.paragraph}
          onPress={() => signOutAsync(this.props.navigation.navigate("Login"))}
        >
          Logout
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center"
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
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
    marginTop: 10
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
