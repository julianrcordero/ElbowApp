import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";

import colors from "../config/colors";
import BiblePickerItem from "./BiblePickerItem";

export default function BibleScreenToolBar(props) {
  const [sliderVisible, setSliderVisible] = useState(false);
  const handleFontSize = () => setSliderVisible(!sliderVisible);

  return (
    <Animated.View
      style={{
        // alignItems: "center",
        borderBottomWidth: 0.2,
        justifyContent: "center",
        backgroundColor: colors.light,
        borderColor: colors.medium,
        flex: 1,
        flexDirection: "row",
        // elevation: 1,
        height: props.HEADER_HEIGHT,
        position: "absolute",
        transform: [{ translateY: props.headerY }],
        width: "100%",
        zIndex: 1,
      }}
    >
      <BiblePicker
        currentBook={props.currentBook}
        currentChapter={props.currentChapter}
        currentVerse={props.currentVerse}
        onSelectItem={(item) => props.changeBibleBook(item)}
        fontSize={props.fontSize}
        HEADER_HEIGHT={props.HEADER_HEIGHT}
        icon="magnify"
        placeholder="Category"
        PickerItemComponent={BiblePickerItem}
        bottomSheetRef={props.bottomSheetRef}
        setSettingsMode={props.setSettingsMode}
      />
    </Animated.View>
  );
}
