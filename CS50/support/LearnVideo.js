import React, { Component } from "react";
import { WebView } from "react-native-webview";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { Linking, WebBrowser } from "expo";

const { width, height } = Dimensions.get("window");

export default class LearnVideo extends Component {
  open() {
    Linking.openURL("https://www.youtube.com/watch?v=" + this.props.video_url);
    global.currentScreenIndex = 3;
    this.props.navigation.goBack(null);
  }
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
    if (Platform.OS === "android") {
      this.open();
      return null;
    } else {
      return (
        <WebView
          source={{
            uri: "https://www.youtube.com/watch?v=" + this.props.video_url
          }}
          renderLoading={this.LoadingIndicatorView}
          startInLoadingState={true}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    marginVertical: height / 2
  }
});
