import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  // const insets = useSafeArea();

  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
