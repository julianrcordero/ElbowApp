import React, { PureComponent, useState } from "react";
import {
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import Animated from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useDeviceOrientation } from "@react-native-community/hooks";

// import * as IJohn from "../json/bible/I John.json";
import * as Bible from "../json/bible/Bible";
import PanelBox from "../components/PanelBox";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

import Paragraph from "./ParagraphView";
import AccordionView from "../components/AccordionView";
import VerseByVerse from "./VerseByVerseView";
import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { ScrollView } from "react-native-gesture-handler";

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

export default function BibleScreen({
  HEADER_HEIGHT,
  scrollY,
  headerY,
  navigationY,
}) {
  var jsonString = JSON.stringify(Bible.Genesis);
  var jsonObject = JSON.parse(jsonString);
  const { landscape } = useDeviceOrientation();

  const sections = [];
  let verses = [];
  const book = jsonObject["crossway-bible"]["book"]["_title"];
  const chapters = jsonObject["crossway-bible"]["book"]["chapter"];

  chapters.map((chapter) => {
    verses = [];
    chapter["verse"].forEach((verse) => {
      verses.push({
        title: verse,
        content: "Commentary",
      });
    });

    Array.isArray(chapter["heading"])
      ? sections.push({
          title: chapter["heading"][0],
          data: chapter["verse"],
          chapterNum: chapter["_num"],
          paragraphData: verses,
        })
      : sections.push({
          title: chapter["heading"],
          data: chapter["verse"],
          chapterNum: chapter["_num"],
          paragraphData: verses,
        });
  });

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

  const [searchWords] = useState([]);
  const [category, setCategory] = useState(categories[0]);
  const [paragraphView, setParagraphView] = useState(true);
  const [theCollapsed, setTheCollapsed] = useState();
  const [verseReference, setVerseReference] = useState("");
  const [verseContent, setVerseContent] = useState("");
  const [allowDragging, setAllowDragging] = useState(true);

  const listRef = React.useRef();

  // const sectionListScroll = (sectionIndex, itemIndex) =>
  //   listRef.current.getNode().scrollToLocation({
  //     sectionIndex: sectionIndex,
  //     itemIndex: itemIndex,
  //     viewPosition: 0,
  //     viewOffset: 0,
  //   });

  const toggleSlideView = () => {
    this._panel.hid ? this._panel.hide() : this._panel.show();
  };

  //SINGLE VERSE VIEW #1 (THIS WORKS)
  let verseByVerse1 = (
    <AnimatedSectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      initialNumToRender={1}
      renderSectionHeader={({ section: { title } }) => (
        <AnimatedSectionHeader title={title} />
      )}
      renderItem={({ item, index, section }) => (
        <VerseByVerse
          key={index}
          chapterNum={section.chapterNum}
          verse={item}
          // landscape={landscape}
          searchWords={searchWords}
          theCollapsed={theCollapsed}
          setTheCollapsed={setTheCollapsed}
          setVerseContent={setVerseContent}
          setVerseReference={setVerseReference}
          toggleSlideView={toggleSlideView}
        />
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
      ref={listRef}
    />
  );

  //SINGLE VERSE VIEW #3 (THIS WORKS)
  let verseByVerse2 = (
    <Animated.ScrollView
      bounces={false}
      scrollEventThrottle={16}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { y: scrollY } },
        },
      ])}
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: HEADER_HEIGHT,
        paddingHorizontal: 25,
      }}
    >
      {sections.map((section, i) => (
        <AccordionView
          key={i}
          verses={section.paragraphData}
          searchWords={searchWords}
        />
      ))}
    </Animated.ScrollView>
  );

  let paragraph = (
    <Animated.ScrollView
      bounces={false}
      scrollEventThrottle={16}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { y: scrollY } },
        },
      ])}
      style={{
        // flex: 1,
        backgroundColor: colors.white,
        paddingTop: HEADER_HEIGHT,
        paddingHorizontal: 25,
      }}
    >
      {sections.map((section, i) => (
        <Paragraph
          key={i}
          chapterNum={section.chapterNum}
          section={section}
          searchWords={searchWords}
          setVerseContent={setVerseContent}
          setVerseReference={setVerseReference}
          toggleSlideView={toggleSlideView}
        />
      ))}
    </Animated.ScrollView>
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: colors.light,
          zIndex: 1,
          // elevation: 1000,
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
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderColor: colors.medium,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          onPress={() => setParagraphView(!paragraphView)}
        >
          <MaterialCommunityIcons
            name="book-open"
            color={colors.black}
            size={20}
          />
        </TouchableOpacity>
      </Animated.View>
      {/* <TextInput
        style={{ height: 40 }}
        placeholder="TYPE HERE"
        onChangeText={(text) => setSearchWords([text])}
      /> */}
      {paragraphView ? paragraph : verseByVerse1}

      <SlidingUpPanel
        allowDragging={allowDragging}
        draggableRange={{ top: 400, bottom: 0 }}
        height={400}
        ref={(c) => (this._panel = c)}
        // snappingPoints={[0, 50, 150, 300]}
        showBackdrop={false}
        zIndex={1000}
      >
        <Animated.View
          style={{
            alignItems: "center",
            backgroundColor: colors.white,
            borderColor: colors.medium,
            borderWidth: 1,
            bottom: 70,
            // elevation: 1000,
            flex: 1,
            justifyContent: "flex-start",
            marginHorizontal: 10,
            padding: 20,
            position: "relative",
            // top: 70,
            transform: [{ translateY: navigationY }],
            // zIndex: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
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
                  name="marker"
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
                  name="bookmark-outline"
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
                onPress={() => setParagraphView(!paragraphView)}
              >
                <MaterialCommunityIcons
                  name="heart-outline"
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
                  name="file-multiple"
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
                onPress={() => setParagraphView(!paragraphView)}
              >
                <MaterialCommunityIcons
                  name="file-upload-outline"
                  color={colors.black}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <Button title="Done" onPress={() => this._panel.hide()} />
          </View>
          <ScrollView
            onTouchStart={() => setAllowDragging(false)}
            onTouchEnd={() => setAllowDragging(true)}
            onTouchCancel={() => setAllowDragging(true)}
          >
            <PanelBox
              book={book}
              verseReference={verseReference}
              verseContent={verseContent}
              landscape={landscape}
            ></PanelBox>
          </ScrollView>
        </Animated.View>
      </SlidingUpPanel>
    </View>
  );
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
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    // marginTop: 22,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
