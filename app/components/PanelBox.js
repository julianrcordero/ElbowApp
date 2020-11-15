import React from "react";
import { Image, View, StyleSheet, TextInput } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDeviceOrientation } from "@react-native-community/hooks";

import colors from "../config/colors";
import AppText from "../components/Text";

import ResourcesScreen from "../screens/ResourcesScreen";
import { ScrollView } from "react-native-gesture-handler";

export default function PanelBox({
  landscape,
  book,
  verseReference,
  verseContent,
}) {
  return (
    <>
      <AppText>{book + " " + verseReference}</AppText>
      <AppText style={{ marginVertical: 10 }}>{verseContent}</AppText>
      <TextInput
        style={{
          backgroundColor: colors.light,
          borderColor: colors.medium,
          borderWidth: 1,
          fontFamily:
            Platform.OS === "android" ? "notoserif" : "ChalkboardSE-Light",
          marginVertical: 10,
          padding: 15,
          width: "100%",
        }}
        multiline
        placeholder="This is my note about the Bible verse."
      ></TextInput>
      <View
        style={{
          borderColor: colors.medium,
          borderWidth: 1,
          marginVertical: 10,
          padding: 15,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            alignItems: "center",
            // marginBottom: 5,
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/studyBibleAppLogo.jpg")}
          ></Image>
          <AppText style={styles.titleText}>John's Note</AppText>
        </View>
        <AppText style={styles.macArthurText}>
          This is a note from John MacArthur. The Bible is the inspired word of
          God. My middle name is Fullerton, like the city. Sometimes I eat
          cheeseburgers. Sin is bad.
        </AppText>
      </View>
      <View
        style={{
          flexDirection: "column",
          // flex: 1,
          borderColor: colors.medium,
          borderWidth: 1,
          marginVertical: 10,
          padding: 15,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/gtylogo.jpg")}
          ></Image>
          <AppText style={styles.titleText}>Related Resources</AppText>
        </View>
        {/* <ResourcesScreen /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  macArthurBox: {
    height: "100%",
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
  macArthurText: {
    color: colors.medium,
    fontSize: 13,
    fontFamily: Platform.OS === "android" ? "normal" : "Georgia-Italic",
  },

  relatedResourcesBox: {
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
});
