import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import Highlighter from "react-native-highlight-words";
// import { TouchableOpacity } from "react-native-gesture-handler";

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
      onPress,
    } = this.props;

    return (
      <Text
        style={[
          defaultStyles.bibleText,
          { fontSize: fontSize, lineHeight: fontSize * 2 },
        ]}
      >
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            crossrefSize={crossrefSize}
            verse={data}
            onPress={() => onPress(chapterNum, j + 1)}
            searchWords={searchWords}
            // key={index}
            // chapterNum={section.chapterNum}
            // crossrefSize={crossrefSize}
            // verse={item}
            // searchWords={searchWords}
            // onPress={() => toggleSlideView(section.chapterNum, index + 1)}
            // // landscape={landscape}
          />
        ))}
      </Text>
    );
  }
}
