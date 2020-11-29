import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import defaultStyles from "../config/styles";
import Highlighter from "react-native-highlight-words";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default class Verse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
    };
  }

  _toggleHighlight = () => {
    if (this.state.backgroundColor === "white") {
      this.setState({ backgroundColor: "yellow" });
    } else {
      this.setState({ backgroundColor: "white" });
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

    return (
      <Text
        style={[
          defaultStyles.bibleText,
          {
            backgroundColor: this.state.backgroundColor,
          },
        ]}
        onPress={() => {
          onPress(
            parsedReference,
            parsedVerse,
            "n" +
              "01" +
              ("000" + chapterNum).substr(-3) +
              ("000" + verse["_num"]).substr(-3)
          );
        }}
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

{
  /* <TouchableOpacity
        onPress={() => {
          onPress();
          // setVerseReference(parsedReference);
          // setVerseContent(parsedVerse);
        }}
        onLongPress={this._toggleHighlight}
      >
        <VerseBox
          content={
            <Text
              style={[
                defaultStyles.bibleText,
                { backgroundColor: this.state.backgroundColor },
              ]}
            >
              <Text style={{ fontWeight: "bold" }}> {verse["_num"]} </Text>
              <HighlightComponent
                highlightStyle={{ backgroundColor: "red" }}
                searchWords={searchWords}
                textToHighlight={parsedVerse}
              />
            </Text>
          }
        />
      </TouchableOpacity> */
}
