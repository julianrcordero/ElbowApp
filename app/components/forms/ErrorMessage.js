import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../Text";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  console.log(error);

  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: { alignSelf: "center", color: "red" },
});

export default ErrorMessage;
