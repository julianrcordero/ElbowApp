import React from "react";
import { Text } from "react-native";

import reactStringReplace from "react-string-replace";

const verseFormatted = (verse, crossrefSize) => {
  return verse["crossref"]
    ? reactStringReplace(verse["__text"], /(\n)/g, (match, i) => (
        <Text
          key={i}
          style={{
            fontSize: crossrefSize,
            // lineHeight: 10
          }}
          // style={{ flexDirection: "row", alignItems: "flex-start" }}
        >
          {Array.isArray(verse["crossref"])
            ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
            : verse["crossref"]["_let"]}
          {/* {match} */}
        </Text>
      ))
    : reactStringReplace(verse["__text"], /(\n)/g, (match, i) => (
        <Text key={i}>{match}</Text>
      ));
};

export default verseFormatted;
