import React, { PureComponent } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import VerseBox from "./VerseBox";
import VerseByVerse from "../screens/VerseByVerseView";
import defaultStyles from "../config/styles";
import Highlighter from "react-native-highlight-words";

const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ";

const CONTENT = [
  {
    title: "First",
    content: BACON_IPSUM,
  },
  {
    title: "Second",
    content: BACON_IPSUM,
  },
  {
    title: "Third",
    content: BACON_IPSUM,
  },
  {
    title: "Fourth",
    content: BACON_IPSUM,
  },
  {
    title: "Fifth",
    content: BACON_IPSUM,
  },
];

export default class AccordionView extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={100}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <HighlightComponent
          style={[
            defaultStyles.text,
            { backgroundColor: this.state.backgroundColor },
          ]}
          highlightStyle={{ backgroundColor: "red" }}
          searchWords={this.props.searchWords}
          textToHighlight={`${section.title["_num"]}  ${
            section.title["crossref"]
              ? section.title["__text"]
                  .toString()
                  .replace(
                    /\n/gi,
                    Array.isArray(section.title["crossref"])
                      ? section.title["crossref"][0]["_let"]
                      : section.title["crossref"]["_let"]
                  )
              : section.title["__text"].toString().replace(/\n/gi, "")
          }`}
        />
        {/* <Text
          style={
            defaultStyles.text
            // styles.headerText
          }
        >
          {`${section.title["_num"]}  ${
            section.title["crossref"]
              ? section.title["__text"]
                  .toString()
                  .replace(
                    /\n/gi,
                    Array.isArray(section.title["crossref"])
                      ? section.title["crossref"][0]["_let"]
                      : section.title["crossref"]["_let"]
                  )
              : section.title["__text"].toString().replace(/\n/gi, "")
          }`}
          {section.title}
        </Text> */}
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={100}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "fadeIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { verses } = this.props;
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
        // contentContainerStyle={{ paddingTop: 30 }}
        >
          <Accordion
            activeSections={activeSections}
            sections={verses}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={100}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#F5FCFF",
    // padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    // fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
