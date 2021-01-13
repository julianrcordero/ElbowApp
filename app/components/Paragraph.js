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
      // focusedVerse,
      fontSize,
      section,
      searchWords,
      onPress,
    } = this.props;

    const ConditionalWrapper = ({ condition, wrapper, children }) =>
      condition ? wrapper(children) : children;

    return (
      //   <ConditionalWrapper
      //     condition={paragraphMode}
      //     wrapper={(children) => <Text>{children}</Text>}
      //   >
      //   </ConditionalWrapper>
      <Text style={[defaultStyles.bibleText, ]}>
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            crossrefSize={crossrefSize}
            fontSize={fontSize}
            // focusedVerse={focusedVerse}
            verse={data}
            onPress={() => onPress(chapterNum, j + 1)}
            searchWords={searchWords}
            style={[
              defaultStyles.bibleText,
              { 
                // fontSize: fontSize, 
                lineHeight: fontSize * 2 
              }
                
            ]}
          />
        ))}
      </Text>
    );
  }
}
