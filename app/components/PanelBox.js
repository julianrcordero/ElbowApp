import React, { PureComponent } from "react";
import { Image, View, StyleSheet, Text, TextInput } from "react-native";
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
import defaultStyles from "../config/styles";

import ResourcesScreen from "../screens/ResourcesScreen";
import { ScrollView } from "react-native-gesture-handler";
import ActivityIndicator from "./ActivityIndicator";

export default class PanelBox extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   backgroundColor: "white",
    //   textDecorationLine: "none",
    // };
  }

  render() {
    const { fontSize, landscape, verseContent, johnsNote } = this.props;

    const macarthurText = fontSize * 0.85;
    const macarthurLineHeight = macarthurText * 2;

    return (
      <>
        <AppText
          style={{
            fontSize: fontSize,
            lineHeight: fontSize * 2,
          }}
        >
          {verseContent}
        </AppText>
        <TextInput
          style={{
            backgroundColor: colors.light,
            borderColor: colors.medium,
            borderWidth: 0.5,
            fontFamily:
              Platform.OS === "android" ? "notoserif" : "ChalkboardSE-Light",
            marginVertical: 15,
            padding: 10,
            width: "100%",
          }}
          multiline
          placeholder="This is my note about the Bible verse."
        ></TextInput>
        <View
          style={{
            borderColor: colors.medium,
            borderWidth: 0.5,
            marginVertical: 0,
            padding: 10,
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
            <AppText style={[styles.titleText, defaultStyles.macArthurText]}>
              John's Note
            </AppText>
          </View>
          <Text
            style={[
              defaultStyles.macArthurText,
              { fontSize: macarthurText, lineHeight: macarthurLineHeight },
            ]}
          >
            {johnsNote}
            {/* This is a note from John MacArthur. The Bible is the inspired word of
          God. My middle name is Fullerton, like the city. Sometimes I eat
          cheeseburgers. Sin is bad. */}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            // flex: 1,
            borderColor: colors.medium,
            borderWidth: 0.5,
            marginVertical: 15,
            padding: 10,
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
}

// export default function PanelBox({
//   fontSize,
//   landscape,
//   verseContent,
//   johnsNote,
// }) {
//   const macarthurText = fontSize * 0.85;
//   const macarthurLineHeight = macarthurText * 2;

//   return (
//     <>
//       <AppText style={{ fontSize: fontSize, lineHeight: fontSize * 2 }}>
//         {verseContent}
//       </AppText>
//       <TextInput
//         style={{
//           backgroundColor: colors.light,
//           borderColor: colors.medium,
//           borderWidth: 1,
//           fontFamily:
//             Platform.OS === "android" ? "notoserif" : "ChalkboardSE-Light",
//           marginVertical: 10,
//           padding: 15,
//           width: "100%",
//         }}
//         multiline
//         placeholder="This is my note about the Bible verse."
//       ></TextInput>
//       <View
//         style={{
//           borderColor: colors.medium,
//           borderWidth: 1,
//           marginVertical: 10,
//           padding: 15,
//           width: "100%",
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignSelf: "flex-start",
//             alignItems: "center",
//             // marginBottom: 5,
//           }}
//         >
//           <Image
//             style={{ width: 30, height: 30 }}
//             source={require("../assets/studyBibleAppLogo.jpg")}
//           ></Image>
//           <AppText style={[styles.titleText, defaultStyles.macArthurText]}>
//             John's Note
//           </AppText>
//         </View>
//         <Text
//           style={[
//             defaultStyles.macArthurText,
//             { fontSize: macarthurText, lineHeight: macarthurLineHeight },
//           ]}
//         >
//           {johnsNote}
//           {/* This is a note from John MacArthur. The Bible is the inspired word of
//           God. My middle name is Fullerton, like the city. Sometimes I eat
//           cheeseburgers. Sin is bad. */}
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: "column",
//           // flex: 1,
//           borderColor: colors.medium,
//           borderWidth: 1,
//           marginVertical: 10,
//           padding: 15,
//           width: "100%",
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignSelf: "flex-start",
//             alignItems: "center",
//           }}
//         >
//           <Image
//             style={{ width: 40, height: 40 }}
//             source={require("../assets/gtylogo.jpg")}
//           ></Image>
//           <AppText style={styles.titleText}>Related Resources</AppText>
//         </View>
//         {/* <ResourcesScreen /> */}
//       </View>
//     </>
//   );
// }

const styles = StyleSheet.create({
  macArthurBox: {
    height: "100%",
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },

  relatedResourcesBox: {
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },

  titleText: {
    paddingVertical: 10,
  },
});
