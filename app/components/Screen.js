import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  // const insets = useSafeArea();
  // console.log(insets);

  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.medium,
    flex: 1,
    // margin: 10,
    // paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
