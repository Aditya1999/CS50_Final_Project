import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import "../support/links";

const { width, height } = Dimensions.get("window");

export default class CS50Progress extends Component {
  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () =>
      this.resetWebViewToInitialUrl()
    );
  }
  componentWillUnmount() {
    this.subs.remove();
  }
  state = {
    key: 1
  };

  resetWebViewToInitialUrl = () => {
    this.setState({
      key: this.state.key + 1
    });
  };

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
        key={this.state.key}
        source={{
          uri: cs50certificates
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
