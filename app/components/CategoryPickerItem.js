import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./Text";
import Icon from "./Icon";
import colors from "../config/colors";

//PickerItem
function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        // style={{ flex: 1, justifyContent: "space-evenly" }}
      >
        <Icon
          backgroundColor={"#345171"} //item.backgroundColor}
          name={item.icon}
          // size={80}
          style={{ flex: 1, alignItems: "center" }}
        />
        {/* <AppText style={styles.label}>{item.label}</AppText> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#345171",
    borderColor: colors.white,
    borderWidth: 0.5,
    height: 55,
    justifyContent: "center",
    // paddingHorizontal: 29,
    // paddingBottom: 5,
    width: "14.2857%",
  },
  label: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 8,
  },
});

export default CategoryPickerItem;
