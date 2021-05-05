import React, { PureComponent } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import AppText from "../components/Text";
import defaultStyles from "../config/styles";

export default class PanelBox extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   backgroundColor: "white",
    //   textDecorationLine: "none",
    // };
  }

  render() {
    const {
      fontSize,
      verseContent,
      johnsNote,
      crossrefs,
      // mapView,
      bottomSheetRef,
    } = this.props;

    const macarthurText = fontSize * 0.85;
    const macarthurLineHeight = macarthurText * 2;

    const navigateBible = () => {
      bottomSheetRef.current.snapTo(1);
    };

    function VerseHyperlink({ cr }) {
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              navigateBible(cr["for"]);
            }}
          >
            <Text style={styles.verseLink}>{cr["text"] + ",\t\t"}</Text>
          </TouchableOpacity>
        </>
      );
    }

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
        {/* {Array.isArray(crossrefs) ? (
          crossrefs.map((crossref) => (
            <Text key={crossref["id"]}>
              {"\n" + crossref["title"] + "\t"}
              {Array.isArray(crossref["refs"]["ref"]) ? (
                crossref["refs"]["ref"].map((cr) => (
                  <VerseHyperlink key={cr["for"]} cr={cr} />
                ))
              ) : (
                <VerseHyperlink
                  key={crossref["for"]}
                  cr={crossref["refs"]["ref"]}
                />
              )}
            </Text>
          ))
        ) : crossrefs["title"] == "" ? null : (
          <Text>
            {"\n" + crossrefs["title"] + "\t"}
            {Array.isArray(crossrefs["refs"]["ref"]) ? (
              crossrefs["refs"]["ref"].map((cr) => (
                <VerseHyperlink key={cr["for"]} cr={cr} />
              ))
            ) : (
              <VerseHyperlink
                key={crossrefs["for"]}
                cr={crossrefs["refs"]["ref"]}
              />
            )}
          </Text>
        )} */}
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

  verseLink: {
    color: "#00aeef",
  },
});
