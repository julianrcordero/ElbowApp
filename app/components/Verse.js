import React, { PureComponent } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Highlighter from "react-native-highlight-words";
import reactStringReplace from "react-string-replace";
import verseFormatted from "./VerseFormatted";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default class Verse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
      // textDecorationLine: "none",
    };
  }

  _toggleHighlight = () => {
    if (this.state.backgroundColor === "white") {
      this.setState({ backgroundColor: "#FFFB79" });
    } else {
      this.setState({ backgroundColor: "white" });
    }
  };

  // _toggleUnderline = () => {
  //   if (this.state.textDecorationLine === "none") {
  //     this.setState({ textDecorationLine: "underline" });
  //   } else {
  //     this.setState({ textDecorationLine: "none" });
  //   }
  // };

  render() {
    const {
      chapterNum,
      crossrefSize,
      // focusedVerse,
      verse,
      searchWords,
      style,
      onPress,
    } = this.props;

    const parsedReference = `${chapterNum} : ${verse["_num"]}`;

    const parsedVerse = verseFormatted(verse, crossrefSize);

    return (
      <Text
        style={[
          style,
          {
            backgroundColor: this.state.backgroundColor,
            // textDecorationLine: this.state.textDecorationLine,
            // focusedVerse == Number(verse["_num"]) ? "underline" : "none",
          },
        ]}
        onPress={onPress}
        onLongPress={this._toggleHighlight}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#00aeef",
          }}
        >
          {" "}
          {verse["_num"]}{" "}
        </Text>

        {parsedVerse}
        {/* <HighlightComponent
          highlightStyle={{ backgroundColor: "red" }}
          searchWords={searchWords}
          textToHighlight={parsedVerse}
        /> */}
      </Text>
    );
  }
}

class HighlightComponent extends PureComponent {
  render() {
    const { style, highlightStyle, searchWords, textToHighlight } = this.props;

    return (
      <Highlighter
        style={style}
        highlightStyle={highlightStyle}
        searchWords={searchWords}
        textToHighlight={textToHighlight}
      />
    );
  }
}
