import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../components/Text";
import BiblePickerItem from "../components/BiblePickerItem";
import ChaptersGridScreen from "./ChaptersGridScreen";
import { AccordionList } from "accordion-collapse-react-native";

class BooksListScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { width } = this.props;
    const books = [
      ////
      {
        label: "Genesis",
        short: "Ge",
        value: 1,
        backgroundColor: "#FFFB79",
        icon: "apps",
        chapters: 50,
      },
      {
        label: "Exodus",
        short: "Ex",
        value: 2,
        backgroundColor: "#FFFB79",
        icon: "apps",
        chapters: 40,
      },
      {
        label: "Leviticus",
        short: "Le",
        value: 3,
        backgroundColor: "#FFFB79",
        icon: "apps",
        chapters: 27,
      },
      {
        label: "Numbers",
        short: "Nu",
        value: 4,
        backgroundColor: "#FFFB79",
        icon: "apps",
        chapters: 36,
      },
      {
        label: "Deuteronomy",
        short: "Dt",
        value: 5,
        backgroundColor: "#FFFB79",
        icon: "apps",
        chapters: 34,
      },
      {
        label: "Joshua",
        short: "Jos",
        value: 6,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 24,
      },
      {
        label: "Judges",
        short: "Jdg",
        value: 7,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 21,
      },
      {
        label: "Ruth",
        short: "Ru",
        value: 8,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 4,
      },
      {
        label: "I Samuel",
        short: "1Sa",
        value: 9,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 31,
      },
      {
        label: "II Samuel",
        short: "2Sa",
        value: 10,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 24,
      },
      {
        label: "I Kings",
        short: "1Ki",
        value: 11,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 22,
      },
      {
        label: "II Kings",
        short: "2Ki",
        value: 12,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 25,
      },
      {
        label: "I Chronicles",
        short: "1Ch",
        value: 13,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 29,
      },
      {
        label: "II Chronicles",
        short: "2Ch",
        value: 14,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 36,
      },
      {
        label: "Ezra",
        short: "Ezr",
        value: 15,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 10,
      },
      {
        label: "Nehemiah",
        short: "Ne",
        value: 16,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 13,
      },
      {
        label: "Esther",
        short: "Es",
        value: 17,
        backgroundColor: "#F9E4B7",
        icon: "apps",
        chapters: 10,
      },
      {
        label: "Job",
        short: "Job",
        value: 18,
        backgroundColor: "#CDEBF9",
        icon: "apps",
        chapters: 42,
      },
      {
        label: "Psalms",
        short: "Ps",
        value: 19,
        backgroundColor: "#CDEBF9",
        icon: "apps",
        chapters: 150,
      },
      {
        label: "Proverbs",
        short: "Pr",
        value: 20,
        backgroundColor: "#CDEBF9",
        icon: "apps",
        chapters: 31,
      },
      {
        label: "Ecclesiastes",
        short: "Ec",
        value: 21,
        backgroundColor: "#CDEBF9",
        icon: "apps",
        chapters: 12,
      },
      {
        label: "Song of Solomon",
        short: "So",
        value: 22,
        backgroundColor: "#CDEBF9",
        icon: "apps",
        chapters: 8,
      },
      {
        label: "Isaiah",
        short: "Is",
        value: 23,
        backgroundColor: "#FFC0CB",
        icon: "apps",
        chapters: 66,
      },
      {
        label: "Jeremiah",
        short: "Je",
        value: 24,
        backgroundColor: "#FFC0CB",
        icon: "apps",
        chapters: 52,
      },
      {
        label: "Lamentations",
        short: "La",
        value: 25,
        backgroundColor: "#CDEBF9",
        icon: "apps",
        chapters: 5,
      },
      {
        label: "Ezekiel",
        short: "Eze",
        value: 26,
        backgroundColor: "#FFC0CB",
        icon: "apps",
        chapters: 48,
      },
      {
        label: "Daniel",
        short: "Da",
        value: 27,
        backgroundColor: "#FFC0CB",
        icon: "apps",
        chapters: 12,
      },
      {
        label: "Hosea",
        short: "Ho",
        value: 28,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 14,
      },
      {
        label: "Joel",
        short: "Joe",
        value: 29,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "Amos",
        short: "Am",
        value: 30,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 9,
      },
      {
        label: "Obadiah",
        short: "Ob",
        value: 31,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 1,
      },
      {
        label: "Jonah",
        short: "Jon",
        value: 32,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 4,
      },
      {
        label: "Micah",
        short: "Mic",
        value: 33,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 7,
      },
      {
        label: "Nahum",
        short: "Na",
        value: 34,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "Habbakuk",
        short: "Hab",
        value: 35,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "Zephaniah",
        short: "Zep",
        value: 36,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "Haggai",
        short: "Hag",
        value: 37,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 2,
      },
      {
        label: "Zechariah",
        short: "Zec",
        value: 38,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 14,
      },
      {
        label: "Malachi",
        short: "Mal",
        value: 39,
        backgroundColor: "#89F0AA",
        icon: "apps",
        chapters: 4,
      },
      {
        label: "Matthew",
        short: "Mt",
        value: 40,
        backgroundColor: "#89F0DE",
        icon: "apps",
        chapters: 28,
      },
      {
        label: "Mark",
        short: "Mk",
        value: 41,
        backgroundColor: "#89F0DE",
        icon: "apps",
        chapters: 16,
      },
      {
        label: "Luke",
        short: "Lk",
        value: 42,
        backgroundColor: "#89F0DE",
        icon: "apps",
        chapters: 24,
      },
      {
        label: "John",
        short: "Jn",
        value: 43,
        backgroundColor: "#89F0DE",
        icon: "apps",
        chapters: 21,
      },
      {
        label: "Acts",
        short: "Ac",
        value: 44,
        backgroundColor: "#F0AA89",
        icon: "apps",
        chapters: 28,
      },
      {
        label: "Romans",
        short: "Ro",
        value: 45,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 16,
      },
      {
        label: "I Corinthians",
        short: "1Co",
        value: 46,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 16,
      },
      {
        label: "II Corinthians",
        short: "2Co",
        value: 47,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 13,
      },
      {
        label: "Galatians",
        short: "Ga",
        value: 48,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 6,
      },
      {
        label: "Ephesians",
        short: "Eph",
        value: 49,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 6,
      },
      {
        label: "Philippians",
        short: "Php",
        value: 50,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 4,
      },
      {
        label: "Colossians",
        short: "Col",
        value: 51,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 4,
      },
      {
        label: "I Thessalonians",
        short: "1Th",
        value: 52,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 5,
      },
      {
        label: "II Thessalonians",
        short: "2Th",
        value: 53,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "I Timothy",
        short: "1Ti",
        value: 54,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 6,
      },
      {
        label: "II Timothy",
        short: "2Ti",
        value: 55,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 4,
      },
      {
        label: "Titus",
        short: "Tt",
        value: 56,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "Philemon",
        short: "Phm",
        value: 57,
        backgroundColor: "#b5cde1",
        icon: "apps",
        chapters: 1,
      },
      {
        label: "Hebrews",
        short: "Heb",
        value: 58,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 13,
      },
      {
        label: "James",
        short: "Jas",
        value: 59,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 5,
      },
      {
        label: "I Peter",
        short: "1Pe",
        value: 60,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 5,
      },
      {
        label: "II Peter",
        short: "2Pe",
        value: 61,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 3,
      },
      {
        label: "I John",
        short: "1Jn",
        value: 62,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 5,
      },
      {
        label: "II John",
        short: "2Jn",
        value: 63,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 1,
      },
      {
        label: "III John",
        short: "3Jn",
        value: 64,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 1,
      },
      {
        label: "Jude",
        short: "Jud",
        value: 65,
        backgroundColor: "#FFDB58",
        icon: "apps",
        chapters: 1,
      },
      {
        label: "Revelation",
        short: "Re",
        value: 66,
        backgroundColor: "#58d0ff",
        icon: "apps",
        chapters: 22,
      },
    ];

    const _renderHeader = (section) => {
      return (
        <BiblePickerItem
          item={section}
          label={section.label}
          // aspectRatio={5}
          height={45}
          // width={width / 2}
        />
      );
    };

    const _renderContent = (section) => {
      return (
        <View style={{ width: width }}>
          <ChaptersGridScreen chapters={section.chapters} />
        </View>
      );
    };

    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <AppText style={styles.sectionTitle}>Old Testament</AppText>
          <AppText style={styles.sectionTitle}>New Testament</AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 30,
          }}
        >
          <View style={styles.column1}>
            <AccordionList
              list={books.slice(0, 39)}
              header={_renderHeader}
              body={_renderContent}
              keyExtractor={(item) => `${item.value}`}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.column2}>
            <AccordionList
              list={books.slice(39, 66)}
              header={_renderHeader}
              body={_renderContent}
              keyExtractor={(item) => `${item.value}`}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    // flexGrow: 1,
    // flexShrink: 1,
    // textAlign: "center",
    fontSize: 20,
  },
  header: {},
  column1: {
    // alignSelf: "stretch",
    // alignItems: "stretch",
    flexGrow: 1,
    // flex: 1 / 2,
    justifyContent: "flex-start",
  },
  column2: {
    // alignSelf: "stretch",
    // alignItems: "flex-end",
    flexGrow: 1,
    // flex: 1 / 2,
    justifyContent: "flex-end",
  },
});

export default BooksListScreen;
