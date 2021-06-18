import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./Text";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: "100%" }}>
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    borderWidth: 1,
    backgroundColor: "green",
    padding: 20,
  },
});

export default PickerItem;
