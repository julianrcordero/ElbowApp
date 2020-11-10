import React, { PureComponent } from "react";

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Highlighter from "react-native-highlight-words";

import VerseBox from "../components/VerseBox";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

import VerseBody from "../components/VerseBody";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

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
    const { verse, landscape, searchWords, toggleSlideView } = this.props;

    return (
      // <Collapse
      //   handleLongPress={this._toggleHighlight}
      //   isCollapsed={this.state.collapsed}
      //   onToggle={this._toggleCollapse}
      //   // style={{
      //   //   flex: 1,
      //   //   paddingHorizontal: 25,
      //   //   backgroundColor: colors.white,
      //   // }}
      // >
      //   <CollapseHeader>
      <TouchableOpacity
        onPress={() => toggleSlideView()}
        onLongPress={this._toggleHighlight}
      >
        <VerseBox
          content={
            <HighlightComponent
              style={[
                defaultStyles.text,
                // styles.bibleText,
                { backgroundColor: this.state.backgroundColor },
              ]}
              highlightStyle={{ backgroundColor: "red" }}
              searchWords={searchWords}
              textToHighlight={`${verse["_num"]}  ${
                verse["crossref"]
                  ? verse["__text"]
                      .toString()
                      .replace(
                        /\n/gi,
                        Array.isArray(verse["crossref"])
                          ? verse["crossref"][0]["_let"]
                          : verse["crossref"]["_let"]
                      )
                  : verse["__text"].toString().replace(/\n/gi, "")
              }`}
            />
          }
        />
      </TouchableOpacity>
      //   </CollapseHeader>
      //   <CollapseBody>
      //     <VerseBody landscape={landscape} />
      //   </CollapseBody>
      // </Collapse>
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
