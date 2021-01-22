import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

function BiblePickerItem({ item, onPress, label }) {
  return (
    <View style={[styles.container, { backgroundColor: item.backgroundColor }]}>
      <AppText style={styles.text}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    // padding: 15,
    fontSize: 12,
  },
});

export default BiblePickerItem;
