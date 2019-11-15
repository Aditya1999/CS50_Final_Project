import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import LearnList from "./LearnList";
import LearnVideo from "./LearnVideo";
export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="LearnList"
            component={LearnList}
            title="Playlist Videos"
          />
          <Scene key="LearnVideo" component={LearnVideo} title="View Video" />
        </Stack>
      </Router>
    );
  }
}
