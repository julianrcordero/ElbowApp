import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import Highlighter from "react-native-highlight-words";
// import { TouchableOpacity } from "react-native-gesture-handler";

import VerseBox from "./VerseBox";
export default class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      chapterNum,
      crossrefSize,
      fontSize,
      section,
      searchWords,
      setVerseContent,
      setVerseReference,
      onPress,
    } = this.props;

    return (
      <Text style={{ fontSize: fontSize }}>
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            crossrefSize={crossrefSize}
            verse={data}
            onPress={onPress}
            searchWords={searchWords}
          />
        ))}
      </Text>
    );
  }
}
