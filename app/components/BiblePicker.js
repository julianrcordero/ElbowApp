import React, { useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  // Modal,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Modal from "react-native-modal";
import Screen from "./Screen";
import { FlatList } from "react-native-gesture-handler";
import PickerItem from "./PickerItem";
import colors from "../config/colors";
const { height, width } = Dimensions.get("window");

import { createStackNavigator } from "@react-navigation/stack";
import BooksScreen from "../screens/BooksScreen";
import ChaptersScreen from "../screens/ChaptersScreen";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
const Stack = createStackNavigator();

function BiblePicker({
  currentBook,
  currentChapter,
  currentVerse,
  fontSize,
  height,
  icon,
  onSelectItem,
  placeholder,
  settingsRef,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const ToolBar = () => {};

  return (
    <CollapsibleView
      // activeOpacityFeedback={1}
      title={
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
                  height: height,
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
                  <AppText style={styles.placeholder}>{placeholder}</AppText>
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
              onPress={() => settingsRef.current.snapTo(0)}
            >
              <MaterialCommunityIcons
                name="format-letter-case"
                color={colors.black}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      collapsibleContainerStyle={{
        position: "absolute",
        top: "100%",
      }}
      style={{
        backgroundColor: colors.light,
        height: height,
        justifyContent: "center",
        width: "100%",
      }}
      noArrow
    >
      <View
        style={{
          backgroundColor: "red",
          height: 610,
          // zIndex: 500,
          width: "100%",
        }}
      >
        <Stack.Navigator
          // mode="card"
          screenOptions={{ headerShown: false }}
          // style={{ height: 500 }}
        >
          <Stack.Screen name="Books" component={BooksScreen} />
          <Stack.Screen
            name="Chapters"
            children={() => (
              <ChaptersScreen
                setModalVisible={setModalVisible}
                onSelectItem={onSelectItem}
              />
            )}
          />
        </Stack.Navigator>
      </View>
    </CollapsibleView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    // borderWidth: 1,
    flexDirection: "row",
    // height: 70,
    paddingHorizontal: 15,
  },
  iconLeft: {
    alignItems: "center",
    // borderWidth: 0.5,
    // flex: 1,
    // height: height,
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    // borderWidth: 0.5,
    flex: 1,
    // height: height,
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
});

export default BiblePicker;
