import React, { Component } from "react";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";
import AboutScreen from "../Screens/About";
import LearnScreen from "../Screens/Learn";
import CS50ProgressScreen from "../Screens/CS50Progress";
import CertificatesScreen from "../Screens/Certificates";
import ChatScreen from "../Screens/Chat";
import SignOutScreen from "../Screens/SignOut";
import CustomSidebarMenu from "./CustomSidebarMenu";

global.currentScreenIndex = 0;

class NavigationDrawer extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require("../assets/drawer.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Home = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const Profile = createStackNavigator({
  Second: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Profile",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const About = createStackNavigator({
  Third: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      title: "About",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const Learn = createStackNavigator({
  Fourth: {
    screen: LearnScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Learn",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const CS50Progress = createStackNavigator({
  Fifth: {
    screen: CS50ProgressScreen,
    navigationOptions: ({ navigation }) => ({
      title: "CS50 Progress",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const Certificates = createStackNavigator({
  Sixth: {
    screen: CertificatesScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Certificates",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const Chat = createStackNavigator({
  Seventh: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Chat",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const SignOut = createStackNavigator({
  Eighth: {
    screen: SignOutScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Sign Out",
      headerLeft: <NavigationDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const DrawerNavigator = createDrawerNavigator(
  {
    NavHome: {
      screen: Home,
      navigationOptions: {
        drawerLabel: "Home"
      }
    },
    NavProfile: {
      screen: Profile,
      navigationOptions: {
        drawerLabel: "Profile"
      }
    },
    NavAbout: {
      screen: About,
      navigationOptions: {
        drawerLabel: "Notifications"
      }
    },
    NavLearn: {
      screen: Learn,
      navigationOptions: {
        drawerLabel: "Learn"
      }
    },
    NavCS50Progress: {
      screen: CS50Progress,
      navigationOptions: {
        drawerLabel: "CS50 Progress"
      }
    },
    NavCertificates: {
      screen: Certificates,
      navigationOptions: {
        drawerLabel: "Certificates"
      }
    },
    NavChat: {
      screen: Chat,
      navigationOptions: {
        drawerLabel: "Chat"
      }
    },
    NavSignOut: {
      screen: SignOut,
      navigationOptions: {
        drawerLabel: "Sign Out"
      }
    }
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get("window").width - 130
  }
);
export default createAppContainer(DrawerNavigator);
