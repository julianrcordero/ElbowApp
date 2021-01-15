import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  StyleSheet,
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

function BooksScreen({ navigation }) {
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

  return (
    <Screen style={styles.modal}>
      <AppText>Old Testament</AppText>
      <FlatList
        data={books.slice(0, 39)}
        keyExtractor={(item) => item.value.toString()}
        numColumns={7}
        style={{
          paddingTop: 10,
          // marginHorizontal: 15
        }}
        renderItem={({ item }) => (
          <BiblePickerItem
            item={item}
            label={item.label}
            onPress={() => {
              navigation.navigate("Chapters");
              //   setModalVisible(false);
              //   onSelectItem(item);
            }}
          />
        )}
      />
      <AppText>New Testament</AppText>
      <FlatList
        data={books.slice(39, 66)}
        keyExtractor={(item) => item.value.toString()}
        numColumns={7}
        style={{
          paddingTop: 10,
          // marginHorizontal: 15
        }}
        renderItem={({ item }) => (
          <BiblePickerItem
            item={item}
            label={item.label}
            onPress={() => {
              setModalVisible(false);
              onSelectItem(item);
            }}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 15,
  },
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default BooksScreen;
