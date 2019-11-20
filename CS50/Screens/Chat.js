// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { View, Platform } from "react-native";
import ChatSupport from "../support/ChatSupport";

type Props = {
  name?: string
};

class Chat extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  state = {
    messages: [],
    showAvatarForEveryMessage: false
  };

  get user() {
    const user = firebase.auth().currentUser || {};
    return {
      name: user.displayName,
      _id: ChatSupport.shared.uid,
      avatar: user.photoURL
    };
  }
  onPressAvatar() {
    alert("User Name: " + user.displayName);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={ChatSupport.shared.send}
          user={this.user}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }

  componentDidMount() {
    ChatSupport.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    ChatSupport.shared.off();
  }
}

export default Chat;
