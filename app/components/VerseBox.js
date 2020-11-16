import React, { PureComponent } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

export default class VerseBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      collapsed: false,
    };
  }

  render() {
    const { content, onPress } = this.props;

    return <View style={styles.card}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    // backgroundColor: colors.white,
    // marginBottom: 1,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: colors.light,
    flex: 1,
    paddingHorizontal: 25,
    // backgroundColor: colors.white,
  },
});
