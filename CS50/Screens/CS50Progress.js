import React, { Component } from "react";
import { WebView } from "react-native-webview";

export default class CS50Progress extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: "https://cs50.me/cs50x"
        }}
      />
    );
  }
}
