// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";

import ChatSupport from "../support/ChatSupport";

type Props = {
  name?: string
};

class Chat extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  state = {
    messages: []
  };

  get user() {
    const user = firebase.auth().currentUser || {};
    return {
      name: user.displayName,
      _id: ChatSupport.shared.uid
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={ChatSupport.shared.send}
        user={this.user}
      />
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
