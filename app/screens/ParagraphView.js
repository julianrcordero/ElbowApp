import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import defaultStyles from "../config/styles";
import Highlighter from "react-native-highlight-words";
// import { TouchableOpacity } from "react-native-gesture-handler";

import VerseBox from "../components/VerseBox";
export default class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      chapterNum,
      section,
      searchWords,
      setVerseContent,
      setVerseReference,
      toggleSlideView,
    } = this.props;

    return (
      <Text
        style={{
          fontSize: 20,
          lineHeight: 24,
          textAlign: "justify",
        }}
      >
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            verse={data}
            // setVerseReference={setVerseReference}
            // setVerseContent={setVerseContent}
            // toggleSlideView={toggleSlideView}
            onPress={() => {
              toggleSlideView();
              setVerseReference(`${chapterNum} : ${data["_num"]}`);
              setVerseContent("parsedVerse");
            }}
            searchWords={searchWords}
          />
        ))}
      </Text>
    );
  }
}

class Verse extends PureComponent {
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
    const { chapterNum, verse, onPress, searchWords } = this.props;

    const parsedReference = `${chapterNum} : ${verse["_num"]}`;

    const parsedVerse = verse["crossref"]
      ? verse["__text"].replace(
          /\n/g,
          Array.isArray(verse["crossref"])
            ? verse["crossref"][0]["_let"]
            : verse["crossref"]["_let"]
        )
      : verse["__text"].replace(/\n/g, "");

    return (
      <Text
        style={[
          defaultStyles.text,
          { backgroundColor: this.state.backgroundColor },
        ]}
        onPress={onPress}
        onLongPress={this._toggleHighlight}
        selectionColor={"orange"}
      >
        <Text style={{ fontWeight: "bold" }}> {verse["_num"]} </Text>
        <HighlightComponent
          // style={[
          //   defaultStyles.text,
          //   { backgroundColor: this.state.backgroundColor },
          // ]}
          highlightStyle={{ backgroundColor: "red" }}
          searchWords={searchWords}
          textToHighlight={parsedVerse}
        />
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
