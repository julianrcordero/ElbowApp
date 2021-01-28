import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  InteractionManager,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import colors from "../config/colors";

import { createStackNavigator } from "@react-navigation/stack";
import BooksGridScreen from "../screens/BooksGridScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";

import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
const { height, width } = Dimensions.get("window");

import Collapsible from "react-native-collapsible";
const Stack = createStackNavigator();

import SegmentedControl from "@react-native-community/segmented-control";
import { PureComponent } from "react";
import BooksListScreen from "../screens/BooksListScreen";
import routes from "../navigation/routes";

class BiblePicker extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = { pickerType: 0, collapsed: true };

  _toggleSettings = () => {
    this.props.bottomSheetRef.current.snapTo(1);
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // let myIndex = verseList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
      setTimeout(() => {
        this.props.setSettingsMode(true);
        // carousel.current.scrollToIndex({ animated: false, index: myIndex });
      });
    });
    () => interactionPromise.cancel();
  };

  selectedPicker = () => {
    switch (this.state.pickerType) {
      case 0:
        return (
          <Stack.Navigator
            screenOptions={{ headerShown: true }}
            style={{ elevation: 0 }}
          >
            {/* <Stack.Screen
              name="Books"
              // component={BooksGridScreen}
              options={{ headerShown: false, title: "Books" }}
            >
              {(props) => (
                <BooksGridScreen
                  changeBibleBook={this.props.changeBibleBook}
                  close={() => this.setState({ collapsed: true })}
                />
              )}
            </Stack.Screen> */}
            <Stack.Screen
              name="Books"
              component={BooksGridScreen}
              options={{ headerShown: false, title: "Books" }}
            />

            <Stack.Screen
              name="Chapters"
              component={ChaptersGridScreen}
              options={({ route }) => ({
                headerRight: () => (
                  <AppText style={styles.sectionTitle}>
                    {route.params.title}
                  </AppText>
                ),
                headerStyle: {
                  height: 55,
                },
                headerTitle: "",
                // close: () => this.setState({ collapsed: true }),
                // changeBibleBook: this.props.changeBibleBook,
              })}
            />
          </Stack.Navigator>
        );
      case 1:
        return (
          <Stack.Navigator
            screenOptions={{ headerShown: true }}
            style={{ elevation: 0 }}
          >
            <Stack.Screen
              name="BooksList"
              options={{ headerShown: false, title: "Books" }}
            >
              {(props) => (
                <BooksListScreen
                  changeBibleBook={this.props.changeBibleBook}
                  close={() => this.setState({ collapsed: true })}
                  width={width - 30}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        );
      case 2:
        break;
      default:
        break;
    }
  };

  render() {
    const {
      currentBook,
      currentChapter,
      changeBibleBook,
      fontSize,
      HEADER_HEIGHT,
      placeholder,
    } = this.props;

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
      <View>
        <Collapsible
          align={"center"}
          collapsed={this.state.collapsed}
          // collapsedHeight={-70}
          style={{ backgroundColor: "blue", width: width }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              height:
                height -
                Constants.statusBarHeight -
                HEADER_HEIGHT -
                getBottomSpace(),
              paddingHorizontal: 15,
              // marginHorizontal: 15,
              // width: "100%",
              // top: -70,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.white,
                height: HEADER_HEIGHT,
                justifyContent: "space-between",
                flexDirection: "row",
                // width: width ,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Select a Passage
              </Text>
              <Button
                title={"Cancel"}
                onPress={() => this.setState({ collapsed: true })}
              ></Button>
            </View>
            <SegmentedControl
              values={["GRID", "LIST", "RECENT"]}
              selectedIndex={this.state.pickerType}
              onChange={(event) => {
                this.setState({
                  pickerType: event.nativeEvent.selectedSegmentIndex,
                });
              }}
              style={{ backgroundColor: colors.light, height: 45 }}
            />
            {this.selectedPicker()}
          </View>
        </Collapsible>
        <View
          style={{ flexDirection: "row", zIndex: 1, paddingHorizontal: 10 }}
        >
          <View
            style={{
              flex: 11,
              flexDirection: "row",
              // width: "55%",
            }}
          >
            <TouchableOpacity
              style={[
                styles.iconLeft,
                {
                  height: HEADER_HEIGHT,
                  width: "20%",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="magnify"
                color={colors.black}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ collapsed: false })}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "row",
                  // borderWidth: 0.2,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: fontSize }}>
                  {currentBook ? (
                    <AppText style={[styles.text]}>
                      {
                        currentBook.label + " " + currentChapter // +" : " +currentVerse
                      }
                    </AppText>
                  ) : (
                    <AppText style={styles.placeholder}>{placeholder}</AppText>
                  )}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color={defaultStyles.colors.dark}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 9,
              // width: "45%",
            }}
          >
            <TouchableOpacity
              style={[styles.icon, { paddingHorizontal: 17 }]}
              // onPress={props.toggleParagraphMode}
            >
              <Text
                style={{
                  borderRadius: 4,
                  borderWidth: 0.2,
                  borderColor: colors.medium,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                }}
              >
                NASB
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <MaterialCommunityIcons
                name="speaker"
                color={colors.black}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={this._toggleSettings}
            >
              <MaterialCommunityIcons
                name="format-letter-case"
                color={colors.black}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
    color: colors.black,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
  },
  titleCard: {},
});

export default BiblePicker;
