import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function MenuButton({ title, icon, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // { backgroundColor: colors[color] }
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={colors.black}
        style={styles.image}
      ></MaterialCommunityIcons>
      <Text style={styles.text}>{title}</Text>
      {/* <Image resizeMode="contain" style={styles.image} source={icon}></Image>
       */}
    </TouchableOpacity>

    /* <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={colors.white}
        ></MaterialCommunityIcons>
      </View>
    </TouchableWithoutFeedback> */
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
    // borderWidth: 0.2,
    flex: 1,
    // height: 70,
    justifyContent: "center",
    // paddingBottom: 10,
    // paddingTop: 12,
  },
  image: {
    paddingBottom: 5,
  },
  text: {
    color: colors.black,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "normal",
    paddingTop: 5,
  },
});

export default MenuButton;
