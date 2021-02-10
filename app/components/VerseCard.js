import React, { PureComponent } from "react";
import { ScrollView, View } from "react-native";

import colors from "../config/colors";
import PanelBox from "../components/PanelBox";
import AppText from "../components/Text";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListingEditScreen from "../screens/ListingEditScreen";
import AppButton from "./Button";

export default class VerseCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loved: false,
      editing: false,
    };
  }

  render() {
    const {
      currentBook,
      item,
      fontSize,
      height,
      crossRefSize,
      bottomSheetRef,
      markerList,
      setMarkerList,
    } = this.props;

    return (
      <View style={{ height: height }}>
        {this.state.editing ? (
          <ListingEditScreen
            verseCard={this}
            markerList={markerList}
            setMarkerList={setMarkerList}
            title={item.title}
            description={item.description}
          />
        ) : (
          <>
            <View
              style={{
                alignItems: "center",
                height: 50,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <AppText
                  style={{
                    fontSize: fontSize,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {/* {currentBook.label + " " + item.chapter + " : " + item.title} */}
                  {item.title}
                </AppText>
                <AppButton
                  title={"Edit"}
                  onPress={() => {
                    console.log("Edit clicked");
                    this.setState({ editing: true });
                  }}
                />
              </View>
            </View>
            <PanelBox
              fontSize={fontSize}
              verseContent={item.description}
              johnsNote={item.johnsNote}
              crossrefs={item.crossrefs}
              crossRefSize={crossRefSize}
              bottomSheetRef={bottomSheetRef}
            ></PanelBox>
          </>
        )}
      </View>
    );
  }
}
