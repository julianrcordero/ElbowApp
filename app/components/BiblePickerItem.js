import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

function BiblePickerItem({ item, onPress }) {
  return (
    <View style={[styles.container, { backgroundColor: item.backgroundColor }]}>
      <TouchableOpacity onPress={onPress}>
        <AppText style={styles.text}>{item.short}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: "#345171",
    borderColor: colors.white,
    borderWidth: 0.5,
    height: 55,
    justifyContent: "center",
    // paddingHorizontal: 29,
    // paddingBottom: 5,
    width: "14.2857%",
  },
  text: {
    padding: 15,
  },
});

export default BiblePickerItem;
