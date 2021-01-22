import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import BiblePickerItem from "../components/BiblePickerItem";
import Accordion from "react-native-collapsible/Accordion";
import ChaptersGridScreen from "./ChaptersGridScreen";

function BooksListScreen({ navigation, route }) {
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
      chapters: 50,
    },
    {
      label: "Leviticus",
      short: "Le",
      value: 3,
      backgroundColor: "#FFFB79",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Numbers",
      short: "Nu",
      value: 4,
      backgroundColor: "#FFFB79",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Deuteronomy",
      short: "Dt",
      value: 5,
      backgroundColor: "#FFFB79",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Joshua",
      short: "Jos",
      value: 6,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Judges",
      short: "Jdg",
      value: 7,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Ruth",
      short: "Ru",
      value: 8,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Samuel",
      short: "1Sa",
      value: 9,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Samuel",
      short: "2Sa",
      value: 10,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Kings",
      short: "1Ki",
      value: 11,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Kings",
      short: "2Ki",
      value: 12,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Chronicles",
      short: "1Ch",
      value: 13,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Chronicles",
      short: "2Ch",
      value: 14,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Ezra",
      short: "Ezr",
      value: 15,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Nehemiah",
      short: "Ne",
      value: 16,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Esther",
      short: "Es",
      value: 17,
      backgroundColor: "#F9E4B7",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Job",
      short: "Job",
      value: 18,
      backgroundColor: "#CDEBF9",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Psalms",
      short: "Ps",
      value: 19,
      backgroundColor: "#CDEBF9",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Proverbs",
      short: "Pr",
      value: 20,
      backgroundColor: "#CDEBF9",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Ecclesiastes",
      short: "Ec",
      value: 21,
      backgroundColor: "#CDEBF9",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Song of Solomon",
      short: "So",
      value: 22,
      backgroundColor: "#CDEBF9",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Isaiah",
      short: "Is",
      value: 23,
      backgroundColor: "#FFC0CB",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Jeremiah",
      short: "Je",
      value: 24,
      backgroundColor: "#FFC0CB",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Lamentations",
      short: "La",
      value: 25,
      backgroundColor: "#CDEBF9",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Ezekiel",
      short: "Eze",
      value: 26,
      backgroundColor: "#FFC0CB",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Daniel",
      short: "Da",
      value: 27,
      backgroundColor: "#FFC0CB",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Hosea",
      short: "Ho",
      value: 28,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Joel",
      short: "Joe",
      value: 29,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Amos",
      short: "Am",
      value: 30,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Obadiah",
      short: "Ob",
      value: 31,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Jonah",
      short: "Jon",
      value: 32,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Micah",
      short: "Mic",
      value: 33,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Nahum",
      short: "Na",
      value: 34,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Habbakuk",
      short: "Hab",
      value: 35,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Zephaniah",
      short: "Zep",
      value: 36,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Haggai",
      short: "Hag",
      value: 37,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Zachariah",
      short: "Zec",
      value: 38,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Malachi",
      short: "Mal",
      value: 39,
      backgroundColor: "#89F0AA",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Matthew",
      short: "Mt",
      value: 40,
      backgroundColor: "#89F0DE",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Mark",
      short: "Mk",
      value: 41,
      backgroundColor: "#89F0DE",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Luke",
      short: "Lk",
      value: 42,
      backgroundColor: "#89F0DE",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "John",
      short: "Jn",
      value: 43,
      backgroundColor: "#89F0DE",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Acts",
      short: "Ac",
      value: 44,
      backgroundColor: "#F0AA89",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Romans",
      short: "Ro",
      value: 45,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Corinthians",
      short: "1Co",
      value: 46,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Corinthians",
      short: "2Co",
      value: 47,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Galatians",
      short: "Ga",
      value: 48,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Ephesians",
      short: "Eph",
      value: 49,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Philippians",
      short: "Php",
      value: 50,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Colossians",
      short: "Col",
      value: 51,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Thessalonians",
      short: "1Th",
      value: 52,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Thessalonians",
      short: "2Th",
      value: 53,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Timothy",
      short: "1Ti",
      value: 54,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Timothy",
      short: "2Ti",
      value: 55,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Titus",
      short: "Tt",
      value: 56,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Philemon",
      short: "Phm",
      value: 57,
      backgroundColor: "#b5cde1",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Hebrews",
      short: "Heb",
      value: 58,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "James",
      short: "Jas",
      value: 59,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I Peter",
      short: "1Pe",
      value: 60,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II Peter",
      short: "2Pe",
      value: 61,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "I John",
      short: "1Jn",
      value: 62,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "II John",
      short: "2Jn",
      value: 63,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "III John",
      short: "3Jn",
      value: 64,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Jude",
      short: "Jud",
      value: 65,
      backgroundColor: "#FFDB58",
      icon: "apps",
      chapters: 50,
    },
    {
      label: "Revelation",
      short: "Re",
      value: 66,
      backgroundColor: "#58d0ff",
      icon: "apps",
      chapters: 50,
    },
  ];

  const [activeSections, setActiveSections] = useState([]);

  const _renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>Chapter numbers</Text>
      </View>
    );
  };

  const _renderHeader = (section) => {
    return (
      <View style={{ height: 50 }}>
        <BiblePickerItem item={section} label={section.label} />
      </View>
    );
  };

  const _renderContent = (section) => {
    return <ChaptersGridScreen chapters={section.chapters} />;
  };

  const _updateSections = (openSections) => {
    setActiveSections(openSections);
  };

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View style={styles.column}>
        <View style={styles.titleCard}>
          <AppText style={styles.sectionTitle}>Old Testament</AppText>
        </View>
        <ScrollView>
          <Accordion
            activeSections={activeSections}
            sections={books}
            //   renderSectionTitle={_renderSectionTitle}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </ScrollView>
        {/* <FlatList
          data={books.slice(0, 39)}
          keyExtractor={(item) => item.value.toString()}
          numColumns={1}
          renderItem={({ item }) => (
              <BiblePickerItem
                item={item}
                label={item.label}
                onPress={() => {
                  navigation.navigate("Chapters");
                }}
              />
          )}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
      <View style={styles.column}>
        <View style={styles.titleCard}>
          <AppText style={styles.sectionTitle}>New Testament</AppText>
        </View>
        <FlatList
          data={books.slice(39, 66)}
          keyExtractor={(item) => item.value.toString()}
          numColumns={1}
          renderItem={({ item }) => (
            <BiblePickerItem
              item={item}
              label={item.label}
              onPress={() => {
                navigation.navigate("Chapters", {
                  params: { title: item.label },
                });
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
  },
  column: { alignItems: "stretch", justifyContent: "center", width: "45%" },
  titleCard: { alignItems: "center", height: 55, justifyContent: "center" },
});

export default BooksListScreen;
