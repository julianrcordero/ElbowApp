import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  style,
  textColor = "transparent",
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={[styles.text, { color: colors[textColor] }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginVertical: 7.5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AppButton;
