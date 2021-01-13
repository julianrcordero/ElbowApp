import React, { PureComponent, useState, useEffect, useCallback } from "react";
import {
  FlatList,
  InteractionManager,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import SlidingUpPanel from "rn-sliding-up-panel";
import Slider from "@react-native-community/slider";
import BottomSheet from "reanimated-bottom-sheet";
import reactStringReplace from "react-string-replace";

// import * as IJohn from "../json/bible/I John.json";
import bookPaths from "../json/bible/Bible";
import VerseCard from "../components/VerseCard";
import Paragraph from "../components/Paragraph";
import Verse from "../components/Verse";
import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import BottomSheetToolBar from "../components/BottomSheetToolBar";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import BibleScreenToolBar from "../components/BibleScreenToolBar";

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
// const onViewableItemsChanged = ({ viewableItems, changed }) => {
//   console.log(viewableItems[0]["index"]);
//   setFocusedVerse(viewableItems[0]["index"]);
//   // console.log("Visible items are", viewableItems);
//   // console.log("Changed in this iteration", changed);
// };

export default function BibleScreen({ HEADER_HEIGHT, scrollY, headerY }) {
  useEffect(() => {
    changeBibleBook({
      label: "Genesis",
      value: 1,
      backgroundColor: "#345171",
      icon: "apps",
    });
  }, []);

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

  var crossrefsJsonObject = JSON.parse(
    JSON.stringify(require("../json/bible/GenesisCrossrefs.json"))
  )["book"];

  const [sections, setSections] = useState([]);
  const [searchWords] = useState([]);
  const [currentBook, setCurrentBook] = useState(books[0]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  // const [bookNotes, setBookNotes] = useState([]);
  const [paragraphMode, setParagraphMode] = useState(true);
  const [] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const crossrefSize = fontSize * 0.6;
  const titleSize = fontSize * 1.5;
  // const { landscape } = useDeviceOrientation();
  const [] = useState(true);
  const { height, width } = Dimensions.get("window");
  const top = height - Constants.statusBarHeight - getBottomSpace();
  const verseCardToolbarHeight = 50;
  const verseCardReferenceHeight = 50;
  const low = HEADER_HEIGHT + verseCardToolbarHeight + verseCardReferenceHeight;
  const sheetRef = React.useRef(null);
  const paragraphBibleRef = React.useRef();
  const carousel = React.useRef();
  const [verseList, setVerseList] = useState([]);
  // const [focusedVerse, setFocusedVerse] = useState(null);

  const changeBibleBook = (newBook) => {
    setCurrentBook(newBook);
    var bibleJsonString = JSON.stringify(bookPaths[newBook.label]);
    var bibleJsonObject = JSON.parse(bibleJsonString);

    let verses = [];
    let johnsNote = "";
    let crossrefs = "";
    const chapters = bibleJsonObject["crossway-bible"]["book"]["chapter"];
    const notes = notesArray[newBook.value - 1]["note"];

    const bookSections = [];
    chapters.map((chapter) => {
      chapter["verse"].forEach((verse) => {
        let note = notes.find(
          (el) =>
            el["_start"] ===
            "n" +
              "01" +
              ("000" + chapter["_num"]).substr(-3) +
              ("000" + verse["_num"]).substr(-3)
        );

        if (note) {
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
          johnsNote = parsedNote;
        } else {
          johnsNote = "There is no note for this passage";
        }

        let crossrefList = crossrefsJsonObject["chapter"][
          Number(chapter["_num"]) - 1
        ]["verse"].find(
          (el) =>
            el["id"] ===
            "01" +
              ("000" + chapter["_num"]).substr(-3) +
              ("000" + verse["_num"]).substr(-3)
        );

        if (crossrefList) {
          crossrefs = crossrefList["letter"];
        } else {
          crossrefs = {
            title: "",
            text: "",
          };
        }

        verses.push({
          chapter: Number(chapter["_num"]),
          title: Number(verse["_num"]),
          content: verse["crossref"]
            ? reactStringReplace(verse["__text"], /(\n)/g, (match, index) => (
                <Text
                  key={index}
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text style={{ fontSize: crossrefSize, lineHeight: 10 }}>
                    {Array.isArray(verse["crossref"])
                      ? " " + verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
                      : " " + verse["crossref"]["_let"]}
                  </Text>
                  {/* {match} */}
                </Text>
              ))
            : reactStringReplace(verse["__text"], "\n", (match, i) => (
                <Text key={i}>{""}</Text>
              )),
          johnsNote: johnsNote,
          loved: false,
          crossrefs: crossrefs,
        });
      });

      Array.isArray(chapter["heading"])
        ? bookSections.push({
            chapterNum: Number(chapter["_num"]),
            title: chapter["heading"][0],
            data: chapter["verse"],
          })
        : bookSections.push({
            chapterNum: Number(chapter["_num"]),
            title: chapter["heading"],
            data: chapter["verse"],
          });
    });
    setSections(bookSections);
    setVerseList(verses);
  };

  const toggleParagraphMode = () => {
    setParagraphMode(!paragraphMode);
  };

  const toggleSlideView = (chapter, verse) => {
    sheetRef.current.snapTo(1);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = verseList.findIndex(
        (obj) => obj.chapter === chapter && obj.title === verse
      );
      setTimeout(() => {
        carousel.current.scrollToIndex({ animated: false, index: myIndex });
      });
    });

    () => interactionPromise.cancel();
  };

  const renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader title={item.title} titleSize={titleSize} />
      <Paragraph
        key={i}
        chapterNum={item.chapterNum}
        crossrefSize={crossrefSize}
        // focusedVerse={focusedVerse}
        fontSize={fontSize}
        section={item}
        searchWords={searchWords}
        onPress={toggleSlideView}
      />
    </React.Fragment>
  );

  let paragraphBible = (
    <AnimatedFlatList
      bounces={false}
      data={sections}
      initialNumToRender={60}
      keyExtractor={(item) => item.chapterNum.toString()}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { y: scrollY } },
        },
      ])}
      ref={paragraphBibleRef}
      renderItem={renderParagraphItem}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={[
        styles.bibleTextView,
        { paddingTop: HEADER_HEIGHT, paddingBottom: HEADER_HEIGHT + 300 },
      ]}
    />
  );

  let verseByVerseBible = (
    <AnimatedSectionList
      bounces={false}
      initialNumToRender={1}
      keyExtractor={(item, index) => item + index}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { y: scrollY } },
        },
      ])}
      renderItem={({ item, index, section }) => (
        <Text style={[defaultStyles.bibleText]}>
          <Verse
            key={index}
            chapterNum={section.chapterNum}
            crossrefSize={crossrefSize}
            verse={item}
            searchWords={searchWords}
            onPress={() => toggleSlideView(section.chapterNum, index + 1)}
            style={[
              defaultStyles.bibleText,
              { fontSize: fontSize, lineHeight: fontSize * 2 },
            ]}
            // landscape={landscape}
          />
        </Text>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <AnimatedSectionHeader title={title} titleSize={titleSize} />
      )}
      scrollEventThrottle={16}
      sections={sections}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      style={[styles.bibleTextView, { paddingTop: HEADER_HEIGHT }]}
    />
  );

  const renderVerseCardItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: colors.white,
          width: width,
          paddingHorizontal: 30,
        }}
      >
        <VerseCard
          key={index}
          currentBook={currentBook}
          item={item}
          crossrefSize={crossrefSize}
          fontSize={fontSize}
          height={
            top -
            HEADER_HEIGHT -
            verseCardToolbarHeight -
            verseCardReferenceHeight
          }
          paragraphBibleRef={paragraphBibleRef}
          scrollY={scrollY}
          sheetRef={sheetRef}
          verseCardReferenceHeight={verseCardReferenceHeight}
        />
      </View>
    );
  };

  // const onViewRef = React.useRef((viewableItems) => {
  //   console.log(viewableItems); //[0]["index"]);
  //   // setFocusedVerse(viewableItems[0]["index"]);
  //   // Use viewable items in state or as intended
  // });
  // const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderBottomSheetContent = () => (
    <View
      style={{
        backgroundColor: colors.white,
        borderColor: colors.medium,
        borderTopWidth: 0.2,
        height: top,
        justifyContent: "flex-start",
      }}
    >
      <BottomSheetToolBar
        verseCardToolbarHeight={verseCardToolbarHeight}
        sheetRef={sheetRef}
      />
      <FlatList
        bounces={false}
        data={verseList}
        decelerationRate={"fast"}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        horizontal={true}
        initialNumToRender={5}
        keyExtractor={(item, index) => item + index}
        ref={carousel}
        renderItem={renderVerseCardItem}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"start"}
        snapToInterval={width}
        // onViewableItemsChanged={onViewRef.current}
        // viewabilityConfig={viewConfigRef.current}
        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={{
        //   itemVisiblePercentThreshold: 50,
        // }}
      />
    </View>
  );

  return (
    <>
      <BibleScreenToolBar
        HEADER_HEIGHT={HEADER_HEIGHT}
        headerY={headerY}
        currentBook={currentBook}
        currentChapter={currentChapter}
        currentVerse={currentVerse}
        changeBibleBook={changeBibleBook}
        fontSize={fontSize}
        setFontSize={setFontSize}
        books={books}
        toggleParagraphMode={toggleParagraphMode}
      />

      {/* <TextInput
        style={{ height: 40 }}
        placeholder="TYPE HERE"
        onChangeText={(text) => setSearchWords([text])}
      /> */}
      {/* {paragraphBible} */}
      {paragraphMode ? paragraphBible : verseByVerseBible}

      <BottomSheet
        ref={sheetRef}
        snapPoints={[top, low, 0]}
        initialSnap={2}
        borderRadius={10}
        renderContent={renderBottomSheetContent}
        // onCloseEnd={() => setFocusedVerse(null)}
      />
    </>
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
  bibleTextView: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
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

//SINGLE VERSE VIEW #3 (THIS WORKS)
// let verseByVerse2 = (
//   <Animated.ScrollView
//     bounces={false}
//     scrollEventThrottle={16}
//     onScroll={Animated.event([
//       {
//         nativeEvent: { contentOffset: { y: scrollY } },
//       },
//     ])}
//     style={{
//       flex: 1,
//       backgroundColor: colors.white,
//       paddingTop: HEADER_HEIGHT,
//       paddingHorizontal: 25,
//     }}
//   >
//     {sections.map((section, i) => (
//       <AccordionView
//         key={i}
//         verses={section.paragraphData}
//         searchWords={searchWords}
//       />
//     ))}
//   </Animated.ScrollView>
// );
