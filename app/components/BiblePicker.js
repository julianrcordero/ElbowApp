import React, { PureComponent } from "react";
import {
  Dimensions,
  FlatList,
  View,
  StyleSheet,
  InteractionManager,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";

import { createStackNavigator } from "@react-navigation/stack";
import BooksGridScreen from "../screens/BooksGridScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";

import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
const { height, width } = Dimensions.get("window");

import Collapsible from "react-native-collapsible";
const Stack = createStackNavigator();

import SegmentedControl from "@react-native-community/segmented-control";
import BooksListScreen from "../screens/BooksListScreen";
import routes from "../navigation/routes";

class BiblePicker extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    pickerType: 0,
    collapsed: true,
    searchOn: false,
    searchHistory: [
      { id: 0, title: "monkey" },
      { id: 1, title: "giraffe" },
      { id: 2, title: "elephant" },
    ],
  };

  _toggleSettings = () => {
    this.props.bottomSheetRef.current.snapTo(1);
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // let myIndex = markerList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
      setTimeout(() => {
        this.props.setSettingsMode(true);
        // carousel.current.scrollToIndex({ animated: false, index: myIndex });
      });
    });
    () => interactionPromise.cancel();
  };

  toggleSearch = () => this.setState({ searchOn: !this.state.searchOn });

  render() {
    const {
      currentBook,
      currentChapter,
      changeBibleBook,
      fontSize,
      HEADER_HEIGHT,
      placeholder,
      topPanel,
    } = this.props;

    return (
      <View style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            height: HEADER_HEIGHT,
            zIndex: 1,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flex: 12,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={styles.search} onPress={this.toggleSearch}>
              <MaterialCommunityIcons
                name="magnify"
                color={colors.black}
                size={28}
              />
            </TouchableOpacity>
            {this.state.searchOn ? (
              <TextInput
                autoFocus
                style={[styles.reference, styles.searchBar]}
                keyboardType="default"
                placeholder="Search"
              />
            ) : (
              <TouchableOpacity
                onPress={() => topPanel.current.setState({ collapsed: false })}
                style={styles.reference}
              >
                <Text style={{ fontSize: fontSize }}>
                  {currentBook ? (
                    <AppText style={styles.referenceText}>
                      {
                        // currentBook.label + " " + currentChapter // +" : " +currentVerse
                        "Song of Solomon 1"
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
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 8,
              // width: "45%",
            }}
          >
            <TouchableOpacity
              style={[styles.icon, { paddingHorizontal: 10 }]}
              // onPress={props.toggleParagraphMode}
            >
              <Text style={styles.translationText}>NASB</Text>
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
  search: {
    alignItems: "center",
    aspectRatio: 0.8,
    // backgroundColor: "green",
    // flexShrink: 1,
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: colors.white,
    marginRight: 5,
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  reference: {
    alignItems: "center",
    // backgroundColor: "blue",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  referenceText: {
    flex: 1,
    color: colors.black,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
  },
  titleCard: {},
  translationText: {
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: colors.medium,
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

export default BiblePicker;
