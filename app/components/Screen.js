import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
    // margin: 10,
    paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
