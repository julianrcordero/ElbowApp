import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.dark}
          style={styles.icon}
        />
      )}
      <TextInput
        // multiline
        numberOfLines={4}
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    // flex: 1,
    flexDirection: "row",
    // width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
