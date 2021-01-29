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
        style={[defaultStyles.bibleText, styles.textInput]}
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
    height: 50,
    // width: "100%",
    // padding: 15,
    marginVertical: 10,
  },
  icon: {
    // backgroundColor: "red",
    alignSelf: "center",
    // flex: 1,
    marginHorizontal: 10,
  },
  textInput: {
    // backgroundColor: "green",
    flex: 1,
  },
});

export default AppTextInput;
