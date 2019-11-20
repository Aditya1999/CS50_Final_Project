import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import firebase from "firebase";

export default class Profile extends Component {
  postsomething() {
    global.currentScreenIndex = 0;
    this.props.navigation.goBack(null);
  }

  render() {
    const user = firebase.auth().currentUser || {};
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: user.photoURL }} />
            <Text style={styles.name}>{user.displayName}</Text>
            <Text style={styles.userInfo}>{user.email} </Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.postsomething()}
            >
              <Text style={styles.buttonText}> Post Something... </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 120, paddingLeft: 110 }}>
          <Text>//Posts</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600"
  },
  body: {
    backgroundColor: "white",
    height: 500,
    flexDirection: "column"
  },
  item: {
    flexDirection: "column",
    paddingLeft: 40
  },
  infoContent: {
    alignItems: "flex-start",
    paddingLeft: 5
  },
  iconContent: {
    alignItems: "center",
    paddingRight: 2
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "black"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  buttonText: {
    fontFamily: "Baskerville",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "black"
  }
});
