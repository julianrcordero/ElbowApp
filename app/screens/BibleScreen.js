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
import verseFormatted from "../components/VerseFormatted";

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
    {
      label: "Genesis",
      short: "Ge",
      value: 1,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Exodus",
      short: "Ex",
      value: 2,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Leviticus",
      short: "Le",
      value: 3,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Numbers",
      short: "Nu",
      value: 4,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Deuteronomy",
      short: "Dt",
      value: 5,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Joshua",
      short: "Jos",
      value: 6,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Judges",
      short: "Jdg",
      value: 7,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Ruth",
      short: "Ru",
      value: 8,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "I Samuel",
      short: "1Sa",
      value: 9,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "II Samuel",
      short: "2Sa",
      value: 10,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "I Kings",
      short: "1Ki",
      value: 11,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "II Kings",
      short: "2Ki",
      value: 12,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "I Chronicles",
      short: "1Ch",
      value: 13,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "II Chronicles",
      short: "2Ch",
      value: 14,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Ezra",
      short: "Ezr",
      value: 15,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Nehemiah",
      short: "Ne",
      value: 16,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Esther",
      short: "Es",
      value: 17,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Job",
      short: "Job",
      value: 18,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Psalms",
      short: "Ps",
      value: 19,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Proverbs",
      short: "Pr",
      value: 20,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Ecclesiastes",
      short: "Ec",
      value: 21,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Song of Solomon",
      short: "So",
      value: 22,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Isaiah",
      short: "Is",
      value: 23,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Jeremiah",
      short: "Je",
      value: 24,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Lamentations",
      short: "La",
      value: 25,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Ezekiel",
      short: "Eze",
      value: 26,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Daniel",
      short: "Da",
      value: 27,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Hosea",
      short: "Ho",
      value: 28,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Joel",
      short: "Joe",
      value: 29,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Amos",
      short: "Am",
      value: 30,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Obadiah",
      short: "Ob",
      value: 31,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Jonah",
      short: "Jon",
      value: 32,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Micah",
      short: "Mic",
      value: 33,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Nahum",
      short: "Na",
      value: 34,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Habbakuk",
      short: "Hab",
      value: 35,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Zephaniah",
      short: "Zep",
      value: 36,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Haggai",
      short: "Hag",
      value: 37,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Zachariah",
      short: "Zec",
      value: 38,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Malachi",
      short: "Mal",
      value: 39,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Matthew",
      short: "Mt",
      value: 40,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "Mark",
      short: "Mk",
      value: 41,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "Luke",
      short: "Lk",
      value: 42,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "John",
      short: "Jn",
      value: 43,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "Acts",
      short: "Ac",
      value: 44,
      backgroundColor: "#F0AA89",
      icon: "apps",
    },
    {
      label: "Romans",
      short: "Ro",
      value: 45,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "I Corinthians",
      short: "1Co",
      value: 46,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "II Corinthians",
      short: "2Co",
      value: 47,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Galatians",
      short: "Ga",
      value: 48,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Ephesians",
      short: "Eph",
      value: 49,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Philippians",
      short: "Php",
      value: 50,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Colossians",
      short: "Col",
      value: 51,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "I Thessalonians",
      short: "1Th",
      value: 52,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "II Thessalonians",
      short: "2Th",
      value: 53,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "I Timothy",
      short: "1Ti",
      value: 54,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "II Timothy",
      short: "2Ti",
      value: 55,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Titus",
      short: "Tt",
      value: 56,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Philemon",
      short: "Phm",
      value: 57,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Hebrews",
      short: "Heb",
      value: 58,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "James",
      short: "Jas",
      value: 59,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "I Peter",
      short: "1Pe",
      value: 60,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "II Peter",
      short: "2Pe",
      value: 61,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "I John",
      short: "1Jn",
      value: 62,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "II John",
      short: "2Jn",
      value: 63,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "III John",
      short: "3Jn",
      value: 64,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "Jude",
      short: "Jud",
      value: 65,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "Revelation",
      short: "Re",
      value: 66,
      backgroundColor: "#58d0ff",
      icon: "apps",
    },
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
  const crossrefSize = 12; //fontSize * 0.6;
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
                <Text key={i}>
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
          content: verseFormatted(verse, crossrefSize),
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
        // books={books}
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
