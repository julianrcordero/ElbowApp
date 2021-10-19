import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ icon, height = 30, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { height, width }]}>
      {/* {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.dark}
          style={styles.icon}
        />
      )} */}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.bibleText}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  // icon: {
  //   alignSelf: "center",
  //   marginHorizontal: 10,
  // },
});

export default AppTextInput;
