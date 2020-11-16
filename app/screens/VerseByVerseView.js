import React, { PureComponent } from "react";

import { Text, TouchableOpacity } from "react-native";
import Highlighter from "react-native-highlight-words";

import VerseBox from "../components/VerseBox";
import defaultStyles from "../config/styles";

class VerseByVerse extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      collapsed: false,
    };
  }

  _toggleHighlight = () => {
    if (this.state.backgroundColor === "white") {
      this.setState({ backgroundColor: "yellow" });
    } else {
      this.setState({ backgroundColor: "white" });
    }
    console.log("CHANGED");
  };

  _toggleCollapse = (isCollapsed) => {
    this.setState({ collapsed: isCollapsed });

    // console.log(this.props.index);
    // this.props.sectionListScroll(3, this.props.index);
    // this.fixCollapsed(isCollapsed);
  };

  fixCollapsed = (isCollapsed) => {
    if (isCollapsed) {
      if (this.props.theCollapsed) {
        this.props.theCollapsed.setState({ collapsed: false });
      }

      this.props.setTheCollapsed(this);
    } else {
      this.props.setTheCollapsed();
    }
  };

  render() {
    const {
      verse,
      chapterNum,
      searchWords,
      onPress,
      setVerseContent,
      setVerseReference,
    } = this.props;

    const parsedReference = `${chapterNum} : ${verse["_num"]}`;

    const parsedVerse = verse["crossref"]
      ? verse["__text"].replace(
          /\n/g,
          Array.isArray(verse["crossref"])
            ? verse["crossref"][0]["_let"]
            : verse["crossref"]["_let"]
        )
      : verse["__text"].replace(/\n/g, "");

    // const parsedVerse = `${verse["_num"]}  ${
    //   verse["crossref"]
    //     ? verse["__text"]
    //         .toString()
    //         .replace(
    //           /\n/gi,
    //           Array.isArray(verse["crossref"])
    //             ? verse["crossref"][0]["_let"]
    //             : verse["crossref"]["_let"]
    //         )
    //     : verse["__text"].toString().replace(/\n/gi, "")
    // }`;

    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          setVerseReference(parsedReference);
          setVerseContent(parsedVerse);
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
      </TouchableOpacity>
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

export default VerseByVerse;
