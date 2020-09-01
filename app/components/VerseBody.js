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

function VerseBody({ landscape }) {
  return (
    <View
      style={{
        borderColor: colors.light,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: landscape ? "row" : "column",
        }}
      >
        <TextInput
          maxLength={255}
          multiline
          style={[
            styles.myNoteText,
            {
              // width: landscape ? "50%" : "100%",
              flex: landscape ? 0.5 : 1,
            },
          ]}
          numberOfLines={4}
          placeholder="This is my note about the Bible verse above. I am
                          writing it in order to remember what I am learning
                          as I study this passage. God is good, all the time."
        ></TextInput>
        <View
          style={[
            styles.macArthurBox,
            {
              // width: landscape ? "50%" : "100%",
              flex: landscape ? 0.5 : 1,
            },
          ]}
        >
          <Collapse>
            <CollapseHeader>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
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
            </CollapseHeader>
            <CollapseBody>
              <AppText style={styles.macArthurText}>
                This is a note from John MacArthur. The Bible is the inspired
                word of God. My middle name is Fullerton, like the city.
                Sometimes I eat cheeseburgers. Sin is bad.
              </AppText>
            </CollapseBody>
          </Collapse>
        </View>
      </View>
      <View style={styles.relatedResourcesBox}>
        <Collapse>
          <CollapseHeader>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                // marginBottom: 5,
              }}
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../assets/gtylogo.jpg")}
              ></Image>
              <AppText style={styles.titleText}>Related Resources</AppText>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <ResourcesScreen />
          </CollapseBody>
        </Collapse>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  macArthurBox: {
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
  myNoteText: {
    borderColor: colors.medium,
    borderWidth: 1,
    backgroundColor: "#f2f2f2",
    fontSize: 13,
    fontFamily: Platform.OS === "android" ? "notoserif" : "ChalkboardSE-Light",
    marginVertical: 5,
    padding: 10,
  },
  relatedResourcesBox: {
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
});

export default VerseBody;
