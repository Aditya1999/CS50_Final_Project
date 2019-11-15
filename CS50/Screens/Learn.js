import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Routes from "../support/Route";
export default class Learn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Routes />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
