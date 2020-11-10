import React, { PureComponent } from "react";
import { Text } from "react-native";

class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   backgroundColor: "white",
    // };
  }

  // toggleHighlight = () => {
  //   if (this.state.backgroundColor === "white") {
  //     this.setState({ backgroundColor: "yellow" });
  //   } else {
  //     this.setState({ backgroundColor: "white" });
  //   }
  // };

  render() {
    const { section, searchWords } = this.props;

    return section.data.map((data, j) => (
      <Verse
        key={j}
        item={data}
        // backgroundColor={this.state.backgroundColor}
        // onPress={
        //   this.toggleHighlight
        // }
        // searchWords={searchWords}
        // navigation={this.navigation}
      />
    ));
  }
}

class Verse extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
    };
  }

  toggleHighlight = () => {
    if (this.state.backgroundColor === "white") {
      this.setState({ backgroundColor: "yellow" });
    } else {
      this.setState({ backgroundColor: "white" });
    }
  };

  render() {
    const { item } = this.props;

    var newline = item["q"]
      ? item["q"][0]
        ? item["q"][0]["_class"]
          ? item["q"][0]["_class"] === "begin-double"
            ? true
            : false
          : false
        : false
      : false;

    return (
      <Text
        style={{
          backgroundColor: this.state.backgroundColor,
          fontSize: 16, //max 16 for some reason
          lineHeight: 20, //max
          textAlign: "justify",
        }}
        // onPress={
        //     this.toggleHighlight
        // }
      >
        {/* <Text>{newline ? "\n" : ""}</Text> */}
        <Text style={{ fontWeight: "bold" }}> {item["_num"]} </Text>

        {item["crossref"]
          ? item["__text"].replace(
              /\n/g,
              Array.isArray(item["crossref"])
                ? item["crossref"][0]["_let"]
                : item["crossref"]["_let"]
            )
          : item["__text"].replace(/\n/g, "")}
      </Text>
    );
  }
}

export default Paragraph;
