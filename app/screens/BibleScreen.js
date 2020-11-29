import React, { PureComponent, useState } from "react";
import {
  FlatList,
  InteractionManager,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";
import {
  isIphonex,
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useDeviceOrientation } from "@react-native-community/hooks";
import Slider from "@react-native-community/slider";

// import * as IJohn from "../json/bible/I John.json";
import bookPaths from "../json/bible/Bible";
import PanelBox from "../components/PanelBox";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

import Paragraph from "../components/Paragraph";
import AccordionView from "../components/AccordionView";
import Verse from "../components/Verse";
import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={[
          defaultStyles.bibleText,
          {
            fontSize: this.props.titleSize,
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
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
let screenTop = 0;
let screenBottom = 0;

export default function BibleScreen({
  HEADER_HEIGHT,
  scrollY,
  headerY,
  navigationY,
}) {
  const books = [
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

  const notesArray = JSON.parse(
    JSON.stringify(require("../json/bible/esvmsb.notes.json"))
  )["crossway-studynotes"]["book"];

  let [sections, setSections] = useState([]);
  const [searchWords] = useState([]);
  const [currentBook, setCurrentBook] = useState(books[0]);
  const [bookNotes, setBookNotes] = useState([]);
  const [paragraphView, setParagraphView] = useState(false);
  const [verseReference, setVerseReference] = useState("");
  const [verseContent, setVerseContent] = useState("");
  const [johnsNote, setJohnsNote] = useState("");
  const [sliderVisible, setSliderVisible] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const crossrefSize = fontSize * 0.6;
  const titleSize = fontSize * 1.5;
  // const { landscape } = useDeviceOrientation();
  const [allowDragging, setAllowDragging] = useState(true);
  // const [theCollapsed, setTheCollapsed] = useState();
  var _panel;
  const { height } = Dimensions.get("window");
  const listRef = React.useRef();
  const [panelPosition, setPanelPosition] = useState(0);

  const changeBibleBook = (newBook) => {
    setCurrentBook(newBook);
    // console.log(notesArray[newBook.value - 1]["note"]);
    var jsonString = JSON.stringify(bookPaths[newBook.label]);
    var jsonObject = JSON.parse(jsonString);

    let verses = [];
    const book = jsonObject["crossway-bible"]["book"]["_title"];
    const chapters = jsonObject["crossway-bible"]["book"]["chapter"];
    setBookNotes(notesArray[newBook.value - 1]["note"]);

    const bookSections = [];
    chapters.map((chapter) => {
      verses = [];
      chapter["verse"].forEach((verse) => {
        verses.push({
          title: verse,
          content: "Commentary",
        });
      });

      Array.isArray(chapter["heading"])
        ? bookSections.push({
            chapterNum: chapter["_num"],
            title: chapter["heading"][0],
            data: chapter["verse"],
            paragraphData: verses,
          })
        : bookSections.push({
            chapterNum: chapter["_num"],
            title: chapter["heading"],
            data: chapter["verse"],
            paragraphData: verses,
          });
    });
    setSections(bookSections);
  };

  const toggleParagraphView = () => {
    setParagraphView(!paragraphView);
  };

  const toggleSlideView = (reference, passage, msbNote) => {
    _panel.show(350); //height - Constants.statusBarHeight - getBottomSpace());

    // setPanelLoading(true);
    InteractionManager.runAfterInteractions(() => {
      setVerseReference(reference);
      setVerseContent(passage);

      let note = bookNotes.find((el) => el["_start"] === msbNote);

      if (note) {
        const reactStringReplace = require("react-string-replace");
        const pTag = note["content"]["p"][0];

        const parsedNote = pTag["a"]
          ? reactStringReplace(pTag["__text"], /\n/g, (match, i) => (
              <Text
                key={i}
                style={{ flexDirection: "row", alignItems: "flex-start" }}
              >
                <Text style={{ fontSize: crossrefSize, lineHeight: 10 }}>
                  {Array.isArray(pTag["a"])
                    ? "REF1" //pTag["a"][0]["__text"] //"a" is always an array
                    : "REF2"}
                </Text>
                {match}
              </Text>
            ))
          : reactStringReplace(pTag["__text"], /\n/, (match, i) => (
              <Text key={i}>{"REF3"}</Text>
            ));
        setJohnsNote(parsedNote);
      } else {
        setJohnsNote("There is no note for this passage");
      }
    });
  };

  const handleSlide = (value) => setFontSize(value);
  const handleFontSize = () => setSliderVisible(!sliderVisible);

  //SINGLE VERSE VIEW #1 (THIS WORKS)
  let verseByVerse1 = (
    <AnimatedSectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      initialNumToRender={1}
      renderSectionHeader={({ section: { title } }) => (
        <AnimatedSectionHeader title={title} titleSize={titleSize} />
      )}
      renderItem={({ item, index, section }) => (
        <Text style={{ fontSize: fontSize }}>
          <Verse
            key={index}
            chapterNum={section.chapterNum}
            crossrefSize={crossrefSize}
            verse={item}
            searchWords={searchWords}
            onPress={toggleSlideView}
            // landscape={landscape}
          />
        </Text>
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
        backgroundColor: colors.white,
        // flex: 1,
        paddingHorizontal: 25,
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

  const renderItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader title={item.title} titleSize={titleSize} />
      <Paragraph
        key={i}
        chapterNum={item.chapterNum}
        crossrefSize={crossrefSize}
        fontSize={fontSize}
        section={item}
        searchWords={searchWords}
        onPress={toggleSlideView}
      />
    </React.Fragment>
  );

  let paragraph2 = (
    <AnimatedFlatList
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
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item) => item.chapterNum}
    />
  );

  // let paragraph = (
  //   <Animated.ScrollView
  //     bounces={false}
  //     scrollEventThrottle={16}
  //     onScroll={Animated.event([
  //       {
  //         nativeEvent: { contentOffset: { y: scrollY } },
  //       },
  //     ])}
  //     style={{
  //       // flex: 1,
  //       backgroundColor: colors.white,
  //       paddingTop: HEADER_HEIGHT,
  //       paddingHorizontal: 25,
  //     }}
  //   >
  //     {sections.map((section, i) => (
  //       <React.Fragment key={i}>
  //         <AnimatedSectionHeader title={section.title} />
  //         <Paragraph
  //           key={i}
  //           chapterNum={section.chapterNum}
  //           crossrefSize={crossrefSize}
  //           fontSize={fontSize}
  //           section={section}
  //           searchWords={searchWords}
  //           // onPress={toggleSlideView}
  //         />
  //       </React.Fragment>
  //     ))}
  //   </Animated.ScrollView>
  // );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          // left: 0,
          // right: 0,
          // top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: colors.light,
          transform: [{ translateY: headerY }],
          position: "relative",
          // zIndex: 400,
        }}
      >
        <View
        // style={{
        //   alignItems: "center",
        //   justifyContent: "flex-start",
        //   flexDirection: "row",
        //   position: "relative",
        //   zIndex: 300,
        //   // elevation: 300,
        // }}
        >
          <BiblePicker
            currentBook={bookPaths.Genesis}
            selectedItem={currentBook}
            onSelectItem={(item) => changeBibleBook(item)}
            height={HEADER_HEIGHT}
            icon="magnify"
            items={books}
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
            onPress={handleFontSize}
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
            onPress={toggleParagraphView}
          >
            <MaterialCommunityIcons
              name="book-open"
              color={colors.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ alignItems: "flex-end" }}>
          {sliderVisible ? (
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={10}
              maximumValue={30}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor={colors.primary}
              onSlidingComplete={handleSlide}
              step={2}
              value={fontSize}
            />
          ) : null}
        </View> */}
      </Animated.View>

      {/* <TextInput
        style={{ height: 40 }}
        placeholder="TYPE HERE"
        onChangeText={(text) => setSearchWords([text])}
      /> */}
      {paragraphView ? paragraph2 : verseByVerse1}

      <SlidingUpPanel
        allowDragging={allowDragging}
        draggableRange={{
          top: height - Constants.statusBarHeight - getBottomSpace(),
          bottom: 0,
        }}
        // height={height}
        onDragEnd={(position, number, gestureState, GestureState) => {
          console.log(position);
          setPanelPosition(position);
        }}
        ref={(c) => (_panel = c)}
        // snappingPoints={[0, (height - HEADER_HEIGHT) / 3, height]}
        showBackdrop={false}
        style={{
          position: "absolute",
          // elevation: 200,
          zIndex: 200,
        }} //other style }}
      >
        <Animated.View
          style={{
            // alignItems: "center",
            backgroundColor: colors.white,
            borderColor: colors.medium,
            borderWidth: 1,
            // bottom: 70,
            // elevation: 1000,
            flex: 1,
            justifyContent: "flex-start",
            // marginHorizontal: 10,
            padding: 20,
            // position: "relative",
            // top: 70, // + screenTop + screenBottom,
            // transform: [{ translateY: headerY }], //navigationY
            // zIndex: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
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
                onPress={toggleParagraphView}
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
                onPress={toggleParagraphView}
              >
                <MaterialCommunityIcons
                  name="file-upload-outline"
                  color={colors.black}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Button title="Done" onPress={() => _panel.hide()} />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <AppText style={{ fontWeight: "bold", textAlign: "left" }}>
              {currentBook.label + " " + verseReference}
            </AppText>
          </View>
          <ScrollView
            onTouchStart={() => setAllowDragging(false)}
            onTouchEnd={() => setAllowDragging(true)}
            onTouchCancel={() => setAllowDragging(true)}
            showsVerticalScrollIndicator={false}
          >
            <PanelBox
              fontSize={fontSize}
              // crossrefSize={crossrefSize}
              verseContent={verseContent}
              johnsNote={johnsNote}
              // landscape={landscape}
              panelLoading={panelLoading}
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
