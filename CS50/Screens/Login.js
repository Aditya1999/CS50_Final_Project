import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from "react-native";
import * as Font from "expo-font";

export class Login extends Component {
  state = {
    assetsLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "RobotoMono-BoldItalic": require("../assets/fonts/RobotoMono-BoldItalic.ttf")
    });
    this.setState({ assetsLoaded: true });
  }

  onLogin() {}

  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLogin()}
          >
            <Text style={styles.buttonText}> LOG IN </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    alignItems: "center",
    backgroundColor: "black",
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  buttonText: {
    fontFamily: "RobotoMono-BoldItalic",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
});

export default Login;
