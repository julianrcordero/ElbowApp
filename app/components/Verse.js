import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Highlighter from "react-native-highlight-words";
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

    const reactStringReplace = require("react-string-replace");
    const parsedVerse = "This is a parsed verse";
    // verse["crossref"]
    //   ? reactStringReplace(verse["__text"], /\n/, (match, i) => (
    //       <Text
    //         key={i}
    //         style={{ flexDirection: "row", alignItems: "flex-start" }}
    //       >
    //         <Text style={{ fontSize: crossrefSize, lineHeight: 10 }}>
    //           {Array.isArray(verse["crossref"])
    //             ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
    //             : verse["crossref"]["_let"]}
    //         </Text>
    //         {match}
    //       </Text>
    //     ))
    //   :
    // reactStringReplace(verse["__text"], /\n/, (match, i) => (
    //   <Text key={i}>{match}</Text>
    // ));

    // const superFontSize = crossrefSize; //Math.floor(fontSize * 0.6);
    // const superlineHeight = superFontSize * 1.1;
    // const superStyle = {
    //   textAlignVertical: "top",
    //   fontSize: superFontSize,
    //   lineHeight: superlineHeight,
    // };
    // const regular = {
    //   textAlignVertical: "bottom",
    //   fontSize: fontSize,
    // };

    return (
      // <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      //   <Text style={superStyle}>Super</Text>
      //   <Text style={regular}> Regular Text</Text>
      // </View>
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
        <Text style={{ fontWeight: "bold", color: "#00aeef" }}>
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
