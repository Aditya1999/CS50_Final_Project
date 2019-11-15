import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import "../support/links";

const { width, height } = Dimensions.get("window");

export default class CS50Progress extends Component {
  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  render() {
    return (
      <WebView
        source={{
          uri: cs50progress
        }}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
      />
    );
  }
}
const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    marginVertical: height / 2
  }
});
