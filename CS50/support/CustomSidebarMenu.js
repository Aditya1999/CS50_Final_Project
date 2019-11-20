import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import firebase from "firebase";
import Icon from "react-native-vector-icons/AntDesign";

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    const user = firebase.auth().currentUser || {};
    this.proileImage = user.photoURL;

    this.items = [
      {
        navOptionThumb: "home",
        navOptionName: "Home",
        screenToNavigate: "NavHome"
      },
      {
        navOptionThumb: "profile",
        navOptionName: "Profile",
        screenToNavigate: "NavProfile"
      },
      {
        navOptionThumb: "book",
        navOptionName: "Learn",
        screenToNavigate: "NavLearn"
      },
      {
        navOptionThumb: "barschart",
        navOptionName: "CS50 Progress",
        screenToNavigate: "NavCS50Progress"
      },
      {
        navOptionThumb: "idcard",
        navOptionName: "Certificates",
        screenToNavigate: "NavCertificates"
      },
      {
        navOptionThumb: "wechat",
        navOptionName: "Chat",
        screenToNavigate: "NavChat"
      },
      {
        navOptionThumb: "info",
        navOptionName: "About",
        screenToNavigate: "NavAbout"
      },
      {
        navOptionThumb: "logout",
        navOptionName: "Sign Out",
        screenToNavigate: "NavSignOut"
      }
    ];
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        />
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#e2e2e2",
            marginTop: 15
          }}
        />
        <View style={{ width: "100%" }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:
                  global.currentScreenIndex === key ? "#e0dbdb" : "#ffffff"
              }}
            >
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: global.currentScreenIndex === key ? "red" : "black"
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}
              >
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20
  },
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2
  }
});
