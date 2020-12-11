import React, { PureComponent } from "react";
import { ScrollView, View } from "react-native";

import PanelBox from "../components/PanelBox";
import colors from "../config/colors";

import AppText from "../components/Text";

export default class VerseCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  // state = {
  //   screenHeight: 0,
  // };

  // onContentSizeChange = (contentWidth, contentHeight) => {
  //   this.setState({ screenHeight: contentHeight });
  // };

  render() {
    const { currentBook, item, fontSize, height, johnsNote } = this.props;

    // const scrollEnabled = this.state.screenHeight > height - 70 - 59;

    return (
      <>
        {/* <ActivityIndicator visible={panelLoading} /> */}
        <View
          style={{
            alignItems: "center",
            // borderBottomWidth: 0.2,
            // paddingVertical: 15,
            height: 40,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <AppText
            style={{
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {currentBook.label + " " + item.chapter + " : " + item.title}
          </AppText>
        </View>
        <ScrollView
          style={{
            // flex: 1,
            // paddingTop: 15,
            height: height,
            // borderBottomWidth: scrollEnabled ? 0.2 : 0,
            borderTopWidth: 0.2,
          }}
          showsVerticalScrollIndicator={false}
        >
          <PanelBox
            fontSize={fontSize}
            // crossrefSize={crossrefSize}
            verseContent={item.content}
            johnsNote={item.johnsNote}
            // landscape={landscape}
          ></PanelBox>

          <View
            style={{
              // backgroundColor: "white",
              // borderTopWidth: 0.2,
              height: height,
            }}
          ></View>
        </ScrollView>
      </>
    );
  }
}
