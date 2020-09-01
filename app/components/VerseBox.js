import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

function VerseBox({ content, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        {content}
        {/* <AppText style={styles.content}>{content}</AppText> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: colors.white,
    // marginBottom: 1,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: colors.light,
  },
  detailsContainer: {
    // paddingHorizontal: 15,
  },
});

export default VerseBox;
