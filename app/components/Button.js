import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", ...otherProps }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    width: "85%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    // flex: 0.8,
  },
});

export default AppButton;
