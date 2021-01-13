import React, { PureComponent } from "react";
import { ScrollView, View } from "react-native";

import colors from "../config/colors";
import PanelBox from "../components/PanelBox";
import AppText from "../components/Text";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class VerseCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loved: false,
    };
  }

  render() {
    const {
      currentBook,
      item,
      fontSize,
      height,
      crossRefSize,
      paragraphBibleRef,
      scrollY,
      sheetRef,
      verseCardReferenceHeight,
    } = this.props;

    return (
      <>
        <View
          style={{
            alignItems: "center",
            height: verseCardReferenceHeight,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ alignContent: "flex-start", flexDirection: "column" }}>
            <AppText
              style={{
                fontSize: fontSize,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {currentBook.label + " " + item.chapter + " : " + item.title}
            </AppText>
            {this.state.loved ? (
              <MaterialCommunityIcons name="heart" color="red" size={22} />
            ) : null}
          </View>
        </View>
        <ScrollView
          style={{
            height: height,
          }}
          showsVerticalScrollIndicator={false}
        >
          <PanelBox
            fontSize={fontSize}
            verseContent={item.content}
            johnsNote={item.johnsNote}
            crossrefs={item.crossrefs}
            crossRefSize={crossRefSize}
            paragraphBibleRef={paragraphBibleRef}
            scrollY={scrollY}
            sheetRef={sheetRef}
            // landscape={landscape}
          ></PanelBox>

          <View
            style={{
              height: height,
            }}
          ></View>
        </ScrollView>
      </>
    );
  }
}
