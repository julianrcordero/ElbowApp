import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Highlighter from "react-native-highlight-words";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default class Verse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
      textDecorationLine: "none",
    };
  }

  _toggleHighlight = () => {
    if (this.state.backgroundColor === "white") {
      this.setState({ backgroundColor: "#FFFB79" });
    } else {
      this.setState({ backgroundColor: "white" });
    }
  };

  _toggleUnderline = () => {
    if (this.state.textDecorationLine === "none") {
      this.setState({ textDecorationLine: "underline" });
    } else {
      this.setState({ textDecorationLine: "none" });
    }
  };

  render() {
    const {
      chapterNum,
      crossrefSize,
      verse,
      searchWords,
      onPress,
    } = this.props;

    const parsedReference = `${chapterNum} : ${verse["_num"]}`;

    const reactStringReplace = require("react-string-replace");
    const parsedVerse = verse["crossref"]
      ? reactStringReplace(verse["__text"], /\n/, (match, i) => (
          <Text
            key={i}
            style={{ flexDirection: "row", alignItems: "flex-start" }}
          >
            <Text style={{ fontSize: crossrefSize, lineHeight: 10 }}>
              {Array.isArray(verse["crossref"])
                ? verse["crossref"][0]["_let"]
                : verse["crossref"]["_let"]}
            </Text>
            {match}
          </Text>
        ))
      : reactStringReplace(verse["__text"], /\n/, (match, i) => (
          <Text key={i}>{match}</Text>
        ));

    const MyVerse = () => {
      return (
        <View style={{ backgroundColor: "green" }}>
          <Text>{"HELLO"}</Text>
        </View>
      );
    };

    return (
      <Text
        style={{
          backgroundColor: this.state.backgroundColor,
          textDecorationLine: this.state.textDecorationLine,
        }}
        onPress={onPress}
        onLongPress={this._toggleHighlight}
      >
        <Text style={{ fontWeight: "bold" }}> {verse["_num"]} </Text>
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
