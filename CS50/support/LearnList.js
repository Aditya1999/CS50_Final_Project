import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import "./Api";
const MAX_RESULT = 15;
const PLAYLIST_ID = CS50Lectures2019PlaylistID;
const API_KEY = YoutubeApiKey;
export default class LearnList extends Component {
  LearnList() {
    Actions.LearnList();
  }
  LearnVideo(video_url) {
    Actions.LearnVideo({ video_url: video_url });
  }
  componentWillMount() {
    this.fetchPlaylistData();
  }
  fetchPlaylistData = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`
    );
    const json = await response.json();
    this.setState({ LearnVideo: json["items"] });
  };
  constructor(props) {
    super(props);
    this.state = {
      LearnVideo: []
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={this.state.LearnVideo}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.demacate}
              onPress={() => this.LearnVideo(item.contentDetails.videoId)}
            >
              <Text style={styles.item}></Text>
              <Text style={styles.item}>{item.snippet.title}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  demacate: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    borderRadius: 10
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 44
  }
});
