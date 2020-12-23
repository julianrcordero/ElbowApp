import React, { PureComponent } from "react";
import { Button, TouchableOpacity, View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
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
    const { sheetRef, verseCardToolbarHeight } = this.props;

    return (
      <View
        style={{
          backgroundColor: colors.light,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 15,
          height: verseCardToolbarHeight,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
          >
            <MaterialCommunityIcons
              name="marker"
              color={colors.black}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
            onPress={this._toggleBookmarked}
          >
            <MaterialCommunityIcons
              name={this.state.bookmarked ? "bookmark" : "bookmark-outline"}
              color={this.state.bookmarked ? "red" : colors.black}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
            onPress={this._toggleLoved}
          >
            {
              <MaterialCommunityIcons
                name={this.state.loved ? "heart" : "heart-outline"}
                color={this.state.loved ? "red" : "black"}
                size={22}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderColor: colors.medium,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <MaterialCommunityIcons
              name="file-multiple"
              color={colors.black}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
            // onPress={toggleParagraphView}
          >
            <MaterialCommunityIcons
              name="file-upload-outline"
              color={colors.black}
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            title="Low"
            onPress={() => {
              setTimeout(() => {
                sheetRef.current.snapTo(1);
              }, 0);
            }}
            // style={{ padding: 15 }}
          />
          <Button
            title="Done"
            onPress={() => {
              sheetRef.current.snapTo(2);
            }}
            // style={{ padding: 15 }}
          />
        </View>
      </View>
    );
  }
}
