import React, { Component } from "react";
import { StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import links from "../assets/links";

export class AppIntro extends Component {
  render() {
    return <AppIntroSlider slides={slides} />;
  }
}
const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350
  },
  text: {
    color: "#FFFFFF",
    fontSize: 25
  }
});

const slides = [
  {
    key: "s1",
    image: {
      uri: slider_icon
    },
    imageStyle: styles.image,
    backgroundColor: "#000000"
  },
  {
    key: "s2",
    image: {
      uri: slider_img1
    },
    imageStyle: styles.image,
    backgroundColor: "#000000"
  },
  {
    key: "s3",
    image: {
      uri: slider_img2
    },
    imageStyle: styles.image,
    backgroundColor: "#000000"
  },
  {
    key: "s4",
    image: {
      uri: slider_img3
    },
    imageStyle: styles.image,
    backgroundColor: "#000000"
  }
];

export default AppIntro;
