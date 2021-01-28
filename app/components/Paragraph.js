import React, { PureComponent } from "react";
import { Text } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";

export default class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      chapterNum,
      crossrefSize,
      // focusedVerse,
      fontSize,
      section,
      searchWords,
      onPress,
    } = this.props;

    return (
      //   <ConditionalWrapper
      //     condition={paragraphMode}
      //     wrapper={(children) => <Text>{children}</Text>}
      //   >
      //   </ConditionalWrapper>
      <Text style={[defaultStyles.bibleText]}>
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            crossrefSize={crossrefSize}
            // focusedVerse={focusedVerse}
            verse={data}
            onPress={() => onPress(chapterNum, j + 1)}
            searchWords={searchWords}
            style={[
              defaultStyles.bibleText,
              {
                fontSize: fontSize,
                lineHeight: fontSize * 2,
              },
            ]}
          />
        ))}
      </Text>
    );
  }
}
