import React, { PureComponent } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Highlighter from "react-native-highlight-words";
import reactStringReplace from "react-string-replace";
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
      fontSize,
      // focusedVerse,
      verse,
      searchWords,
      style,
      onPress,
    } = this.props;

    const parsedReference = `${chapterNum} : ${verse["_num"]}`;
    // const parsedVerse =
    // verse["crossref"]
    //   ?

    //   "The quick brown fox jumps over the lazy dog. The dog did not comprehend."
    //   :
    //   "You took my only food. Now I'm gonna starve."
    // verse["crossref"]
    //   ?
    //   reactStringReplace(verse["__text"], /\n/, (match, i) => (
    //       <Text
    //         key={i}
    //         // style={{ flexDirection: "row", alignItems: "flex-start" }}
    //       >
    //         <Text style={{ fontSize: crossrefSize,
    //           // lineHeight: 10
    //           }}>
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

    return (
      <Text
        style={[
          style,
          {
            backgroundColor: this.state.backgroundColor,
            // flexDirection: "row",
            // alignItems: "flex-start"
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
            // fontSize: crossrefSize,
            // textAlignVertical: "top",
            // lineHeight: crossrefSize * 1.1
          }}
        >
          {" "}
          {verse["_num"]}{" "}
        </Text>
        <Text
          style={
            ({ textAlignVertical: "bottom" },
            { fontSize: fontSize, lineHeight: fontSize * 2 })
          }
        >
          {verse["crossref"]
            ? verse["__text"].replace(
                "\n",
                Array.isArray(verse["crossref"])
                  ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
                  : verse["crossref"]["_let"]
              )
            : // reactStringReplace(verse["__text"], /\n/, (match, i) => (
              //     <Text
              //       key={i}
              //       // style={{ flexDirection: "row", alignItems: "flex-start" }}
              //     >
              //       <Text
              //         style={{
              //           fontSize: crossrefSize,
              //           // lineHeight: 10
              //         }}
              //       >
              //         {Array.isArray(verse["crossref"])
              //           ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
              //           : verse["crossref"]["_let"]}
              //       </Text>
              //     </Text>
              //   ))
              reactStringReplace(verse["__text"], /\n/, (match, i) => (
                <Text key={i}>{match}</Text>
              ))}
        </Text>
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
