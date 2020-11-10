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

export default function PanelBox({ landscape }) {
  return (
    <>
      <TextInput
        style={{
          backgroundColor: colors.light,
          width: "100%",
          borderColor: colors.medium,
          borderWidth: 1,
        }}
        multiline
        placeholder="This is my note about the Bible verse."
      ></TextInput>
    </>
    // <>
    //   <TextInput
    //     // maxLength={255}
    //     // multiline
    //     style={[
    //       styles.myNoteText,
    //       {
    //         flex: landscape ? 0.5 : 1,
    //       },
    //     ]}
    //     // numberOfLines={4}
    //     placeholder="This is my note about the Bible verse above."
    //   ></TextInput>
    //   <View
    //     style={[
    //       styles.macArthurBox,
    //       {
    //         // width: landscape ? "50%" : "100%",
    //         flex: landscape ? 0.5 : 1,
    //       },
    //     ]}
    //   >
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         alignSelf: "center",
    //         alignItems: "center",
    //         // marginBottom: 5,
    //       }}
    //     >
    //       <Image
    //         style={{ width: 30, height: 30 }}
    //         source={require("../assets/studyBibleAppLogo.jpg")}
    //       ></Image>
    //       <AppText style={styles.titleText}>John's Note</AppText>
    //     </View>
    //     <AppText style={styles.macArthurText}>
    //       This is a note from John MacArthur. The Bible is the inspired word of
    //       God. My middle name is Fullerton, like the city. Sometimes I eat
    //       cheeseburgers. Sin is bad.
    //     </AppText>
    //   </View>
    //   <View style={styles.relatedResourcesBox}>
    //     <Collapse>
    //       <CollapseHeader>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             alignSelf: "center",
    //             // marginBottom: 5,
    //           }}
    //         >
    //           <Image
    //             style={{ width: 40, height: 40 }}
    //             source={require("../assets/gtylogo.jpg")}
    //           ></Image>
    //           <AppText style={styles.titleText}>Related Resources</AppText>
    //         </View>
    //       </CollapseHeader>
    //       <CollapseBody>
    //         <ResourcesScreen />
    //       </CollapseBody>
    //     </Collapse>
    //   </View>
    // </>
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
  myNoteText: {
    // borderColor: colors.medium,
    // borderWidth: 1,
    // backgroundColor: "#f2f2f2",
    // fontSize: 13,
    // fontFamily: Platform.OS === "android" ? "notoserif" : "ChalkboardSE-Light",
    // height: 150,
    // marginVertical: 5,
    // padding: 10,
  },
  relatedResourcesBox: {
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
});
