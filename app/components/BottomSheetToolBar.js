import React, { PureComponent } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Verse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
      textDecorationLine: "none",
      bookmarked: false,
      loved: false,
    };
  }

  _toggleBookmarked = () => {
    this.state.bookmarked === true
      ? this.setState({ bookmarked: false })
      : this.setState({ bookmarked: true });
  };

  _toggleLoved = () => {
    this.state.loved === true
      ? this.setState({ loved: false })
      : this.setState({ loved: true });
  };

  render() {
    return (
      <View
        style={{
          alignItems: "flex-start",
          flex: 0.75,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="marker"
            color={colors.black}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._toggleBookmarked}>
          <MaterialCommunityIcons
            name={this.state.bookmarked ? "bookmark" : "bookmark-outline"}
            color={this.state.bookmarked ? "red" : colors.black}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._toggleLoved}>
          {
            <MaterialCommunityIcons
              name={this.state.loved ? "heart" : "heart-outline"}
              color={this.state.loved ? "red" : "black"}
              size={22}
            />
          }
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-multiple"
            color={colors.black}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-upload-outline"
            color={colors.black}
            size={22}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
