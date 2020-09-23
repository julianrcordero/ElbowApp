import React, { PureComponent, useState, setState, useContext } from "react";
import {
  // Animated,
  FlatList,
  Image,
  StyleSheet,
  Switch,
  // useState,
  Platform,
  ScrollView,
  SectionList,
  StatusBar,
  Text,
  View,
  VirtualizedList,
  Button,
} from "react-native";
import Animated from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
// import React, { useState, Component, setState, PureComponent } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import Highlighter from "react-native-highlight-words";

import { useDeviceOrientation } from "@react-native-community/hooks";

// import * as IJohn from "../json/bible/I John.json";
import * as Bible from "../json/bible/Bible";
import VerseBox from "../components/VerseBox";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import AppText from "../components/Text";
import VerseBody from "../components/VerseBody";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import AppButton from "../components/Button";
import SingleVerseScreen from "./SingleVerseScreen";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={[
          defaultStyles.text,
          {
            fontSize: 22,
            backgroundColor: colors.white,
            // borderBottomColor: "#345171",
          },
        ]}
      >
        {this.props.title}
      </Text>
    );
  }
}
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const AnimatedSectionHeader = Animated.createAnimatedComponent(SectionHeader);

export default function BibleScreen(
  // props
  { navigation, HEADER_HEIGHT, scrollY, diffClampY, headerY }
) {
  var jsonString = JSON.stringify(Bible.Genesis);
  var jsonObject = JSON.parse(jsonString);
  const chapter = jsonObject["crossway-bible"]["book"]["chapter"];
  // const [category, setCategory] = useState(categories[1]);

  // const { params } = //this.props.navigation.state;

  // const { landscape } = useDeviceOrientation();
  const searchWords = [];
  const DATA = [];

  chapter.forEach((section) =>
    Array.isArray(section["heading"])
      ? DATA.push({
          title: section["heading"][0],
          data: section["verse"],
        })
      : DATA.push({
          title: section["heading"],
          data: section["verse"],
        })
  );

  const categories = [
    ////
    { label: "Genesis", value: 1, backgroundColor: "#345171", icon: "apps" },
    { label: "Exodus", value: 2, backgroundColor: "red", icon: "apps" },
    { label: "Leviticus", value: 3, backgroundColor: "red", icon: "apps" },
    { label: "Numbers", value: 4, backgroundColor: "red", icon: "apps" },
    { label: "Deuteronomy", value: 5, backgroundColor: "red", icon: "apps" },
    { label: "Joshua", value: 6, backgroundColor: "red", icon: "apps" },
    { label: "Judges", value: 7, backgroundColor: "red", icon: "apps" },
    { label: "Ruth", value: 8, backgroundColor: "red", icon: "apps" },
    { label: "I Samuel", value: 9, backgroundColor: "red", icon: "apps" },
    { label: "II Samuel", value: 10, backgroundColor: "red", icon: "apps" },
    { label: "I Kings", value: 11, backgroundColor: "red", icon: "apps" },
    { label: "II Kings", value: 12, backgroundColor: "red", icon: "apps" },
    {
      label: "I Chronicles",
      value: 13,
      backgroundColor: "red",
      icon: "apps",
    },
    {
      label: "II Chronicles",
      value: 14,
      backgroundColor: "red",
      icon: "apps",
    },
    { label: "Ezra", value: 15, backgroundColor: "red", icon: "apps" },
    { label: "Nehemiah", value: 16, backgroundColor: "red", icon: "apps" },
    { label: "Esther", value: 17, backgroundColor: "red", icon: "apps" },
    { label: "Job", value: 18, backgroundColor: "red", icon: "apps" },
    { label: "Psalms", value: 19, backgroundColor: "red", icon: "apps" },
    { label: "Proverbs", value: 20, backgroundColor: "red", icon: "apps" },
    {
      label: "Ecclesiastes",
      value: 21,
      backgroundColor: "red",
      icon: "apps",
    },
    {
      label: "Song of Solomon",
      value: 22,
      backgroundColor: "red",
      icon: "apps",
    },
    { label: "Isaiah", value: 23, backgroundColor: "red", icon: "apps" },
    { label: "Jeremiah", value: 24, backgroundColor: "red", icon: "apps" },
    {
      label: "Lamentations",
      value: 25,
      backgroundColor: "red",
      icon: "apps",
    },
    { label: "Ezekiel", value: 26, backgroundColor: "red", icon: "apps" },
    { label: "Daniel", value: 27, backgroundColor: "red", icon: "apps" },
    { label: "Hosea", value: 28, backgroundColor: "red", icon: "apps" },
    { label: "Joel", value: 29, backgroundColor: "red", icon: "apps" },
    { label: "Amos", value: 30, backgroundColor: "red", icon: "apps" },
    { label: "Obadiah", value: 31, backgroundColor: "red", icon: "apps" },
    { label: "Jonah", value: 32, backgroundColor: "red", icon: "apps" },
    { label: "Micah", value: 33, backgroundColor: "red", icon: "apps" },
    { label: "Nahum", value: 34, backgroundColor: "red", icon: "apps" },
    { label: "Habbakuk", value: 35, backgroundColor: "red", icon: "apps" },
    { label: "Zephaniah", value: 36, backgroundColor: "red", icon: "apps" },
    { label: "Haggai", value: 37, backgroundColor: "red", icon: "apps" },
    { label: "Zachariah", value: 38, backgroundColor: "red", icon: "apps" },
    { label: "Malachi", value: 39, backgroundColor: "red", icon: "apps" },
    { label: "Matthew", value: 40, backgroundColor: "red", icon: "apps" },
    { label: "Mark", value: 41, backgroundColor: "red", icon: "apps" },
    { label: "Luke", value: 42, backgroundColor: "red", icon: "apps" },
    { label: "John", value: 43, backgroundColor: "red", icon: "apps" },
    { label: "Acts", value: 44, backgroundColor: "red", icon: "apps" },
    { label: "Romans", value: 45, backgroundColor: "red", icon: "apps" },
    {
      label: "I Corinthians",
      value: 46,
      backgroundColor: "red",
      icon: "apps",
    },
    {
      label: "II Corinthians",
      value: 47,
      backgroundColor: "red",
      icon: "apps",
    },
    { label: "Galatians", value: 48, backgroundColor: "red", icon: "apps" },
    { label: "Ephesians", value: 49, backgroundColor: "red", icon: "apps" },
    { label: "Philippians", value: 50, backgroundColor: "red", icon: "apps" },
    { label: "Colossians", value: 51, backgroundColor: "red", icon: "apps" },
    {
      label: "I Thessalonians",
      value: 52,
      backgroundColor: "red",
      icon: "apps",
    },
    {
      label: "II Thessalonians",
      value: 53,
      backgroundColor: "red",
      icon: "apps",
    },
    { label: "I Timothy", value: 54, backgroundColor: "red", icon: "apps" },
    { label: "II Timothy", value: 55, backgroundColor: "red", icon: "apps" },
    { label: "Titus", value: 56, backgroundColor: "red", icon: "apps" },
    { label: "Philemon", value: 57, backgroundColor: "red", icon: "apps" },
    { label: "Hebrews", value: 58, backgroundColor: "red", icon: "apps" },
    { label: "James", value: 59, backgroundColor: "red", icon: "apps" },
    { label: "I Peter", value: 60, backgroundColor: "red", icon: "apps" },
    { label: "II Peter", value: 61, backgroundColor: "red", icon: "apps" },
    { label: "I John", value: 62, backgroundColor: "red", icon: "apps" },
    { label: "II John", value: 63, backgroundColor: "red", icon: "apps" },
    { label: "III John", value: 64, backgroundColor: "red", icon: "apps" },
    { label: "Jude", value: 65, backgroundColor: "red", icon: "apps" },
    { label: "Revelation", value: 66, backgroundColor: "red", icon: "apps" },
  ];

  const words = DATA;
  const [category, setCategory] = useState(categories[0]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT, //HEADER_HEIGHT, // + Constants.statusBarHeight,
          backgroundColor: colors.light,
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <BiblePicker
          currentBook={Bible.Genesis}
          selectedItem={category}
          onSelectItem={(item) => setCategory(item)}
          height={HEADER_HEIGHT}
          icon="magnify"
          items={categories}
          placeholder="Category"
          backgroundColor={colors.dark}
          numberOfColumns={7}
          PickerItemComponent={CategoryPickerItem}
          flex={1}
          width="55%"
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: colors.light,
            borderRadius: 4,
            borderWidth: 0.2,
            borderColor: colors.medium,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          onPress={() => navigation.navigate("SingleVerse")}
        >
          <Text style={styles.text}>NASB</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: colors.light,
            borderColor: colors.medium,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <MaterialCommunityIcons
            name="speaker"
            color={colors.black}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderColor: colors.medium,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <MaterialCommunityIcons
            name="format-letter-case"
            color={colors.black}
            size={20}
          />
        </TouchableOpacity>
        {/* <TextInput
          style={{ height: 40 }}
          placeholder="TYPE HERE"
          onChangeText={(text) => this.setState({ searchWords: [text] })}
        /> */}
      </Animated.View>

      {/* <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        style={{
          flex: 1,
          paddingTop: HEADER_HEIGHT,
        }}
      > */}
      {/* <Text>
          {words.map((word, i) =>
            word.data.map((prop2, j) => (
              <ParagraphVerse
                key={j}
                item={prop2}
                // searchWords={searchWords}
                // navigation={this.navigation}
              />
            ))
          )}
        </Text> */}
      {/* </Animated.ScrollView> */}

      <AnimatedSectionList
        sections={words}
        // extraData={this.state}
        keyExtractor={(item, index) => item + index}
        initialNumToRender={1}
        renderSectionHeader={({ section: { title } }) => (
          <AnimatedSectionHeader title={title} />
        )}
        renderItem={({ item, index }) => (
          <>
            <Post
              item={item}
              // landscape={landscape}
              searchWords={searchWords}
            />
          </>
        )}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        style={{
          flex: 1,
          paddingTop: HEADER_HEIGHT,
        }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

class ParagraphVerse extends PureComponent {
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
    const { item, searchWords } = this.props;

    return (
      <Text
        style={{
          backgroundColor: this.state.backgroundColor,
          fontSize: 16, //max 16 for some reason
          lineHeight: 20, //max
          textAlign: "justify",
        }}
        onPress={
          // navigation.navigate(SingleVerseScreen)
          // () => console.log("Verse: " + item["_num"])
          this.toggleHighlight
        }
      >
        {item["_num"]}{" "}
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

class Post extends PureComponent {
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
  };

  render() {
    const { item, landscape, searchWords } = this.props;
    const name = "JULIAN";

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          backgroundColor: colors.white,
        }}
      >
        <Collapse
          handleLongPress={this._toggleHighlight}
          isCollapsed={this.state.collapsed}
          onToggle={(isCollapsed) => this.setState({ collapsed: isCollapsed })}
        >
          <CollapseHeader>
            <VerseBox
              content={
                <HighlightComponent
                  style={[
                    defaultStyles.text,
                    styles.bibleText,
                    { backgroundColor: this.state.backgroundColor },
                  ]}
                  highlightStyle={{ backgroundColor: "red" }}
                  searchWords={searchWords}
                  textToHighlight={`${item["_num"]}  ${
                    item["crossref"]
                      ? item["__text"]
                          .toString()
                          .replace(
                            /\n/gi,
                            Array.isArray(item["crossref"])
                              ? item["crossref"][0]["_let"]
                              : item["crossref"]["_let"]
                          )
                      : item["__text"].toString().replace(/\n/gi, "")
                  }`}
                />
              }
            />
          </CollapseHeader>
          <CollapseBody>
            <VerseBody landscape={landscape} />
          </CollapseBody>
        </Collapse>
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

class FlatListItem extends PureComponent {
  render() {
    const { section, landscape, searchWords } = this.props;
    const name = "JULIAN";

    // console.log(section.data[0]);

    return (
      <>
        <Text>{section.title}</Text>
        <FlatList
          data={section.data}
          extraData={this.state}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item, index }) => (
            <>
              {/* <Text>{item["_num"]}</Text> */}
              <AppText style={styles.bibleText}>{`${item["_num"]}`}</AppText>
              {/* <FlatListVerse item={item[index]} /> */}
            </>
          )}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  wordsContainer: {
    alignItems: "center",
    backgroundColor: "green",
    flexDirection: "row",
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  pilgrimsWordSwitch: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
