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
            <Stack.Screen
              name="Books"
              component={BooksGridScreen}
              options={{ headerShown: false, title: "Books" }}
            />
            <Stack.Screen
              name="Chapters"
              component={ChaptersGridScreen}
              options={({}) => ({
                headerTitle: (
                  <AppText style={styles.sectionTitle}>II Hesitations</AppText>
                ),
                headerStyle: styles.titleCard,
                headerTitleStyle: { alignItems: "flex-end" },
                headerTitleContainerStyle: { alignItems: "flex-end" },
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
              name="Books"
              component={BooksListScreen}
              options={{ headerShown: false, title: "Books" }}
            />
            <Stack.Screen
              name="Chapters"
              component={ChaptersGridScreen}
              options={({}) => ({
                headerTitle: (
                  <AppText style={styles.sectionTitle}>II Hesitations</AppText>
                ),
                headerStyle: styles.titleCard,
                headerTitleStyle: { alignItems: "flex-end" },
                headerTitleContainerStyle: { alignItems: "flex-end" },
              })}
            />
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
      fontSize,
      HEADER_HEIGHT,
      placeholder,
    } = this.props;

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
        <View style={{ flexDirection: "row", zIndex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              width: "55%",
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
              width: "45%",
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

        {/* <Collapse
          isCollapsed={this.state.collapsed}
          onToggle={(isCollapsed) => this.setState({ collapsed: isCollapsed })}
        >
          <CollapseHeader>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  width: "55%",
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
                      <AppText style={styles.placeholder}>
                        {placeholder}
                      </AppText>
                    )}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={24}
                    color={defaultStyles.colors.dark}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "45%",
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
          </CollapseHeader>
          <CollapseBody style={{ backgroundColor: "green" }}>
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
                top: -70,
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
                  onPress={() => this.setState({ collapsed: false })}
                ></Button>
              </View>
              <SegmentedControl
                values={["GRID", "LIST", "RECENT"]}
                selectedIndex={0}
                onChange={() => {
                  // this.setState({
                  //   selectedIndex: event.nativeEvent.selectedSegmentIndex,
                  // });
                }}
                style={{ backgroundColor: colors.light, height: 45 }}
              />
              <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen
                  name="Books"
                  component={BooksScreen}
                  options={{ headerShown: false, title: "Books" }}
                />
                <Stack.Screen
                  name="Chapters"
                  component={ChaptersScreen}
                  options={({ route }) => ({
                    headerTitle: (
                      <AppText style={styles.sectionTitle}>
                        II Hesitations
                      </AppText>
                    ),
                    headerStyle: styles.titleCard,
                    headerTitleStyle: { alignItems: "flex-end" },
                    headerTitleContainerStyle: { alignItems: "flex-end" },
                  })}
                />
              </Stack.Navigator>
            </View>
          </CollapseBody>
        </Collapse> */}
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
