import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";

import colors from "../config/colors";
import BiblePickerItem from "./BiblePickerItem";

export default function BibleScreenToolBar(props) {
  const [sliderVisible, setSliderVisible] = useState(false);
  const handleFontSize = () => setSliderVisible(!sliderVisible);
  const handleSlide = (value) => props.setFontSize(value);

  return (
    <Animated.View
      style={{
        alignItems: "center",
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
      {/* <View
        style={{
          position: "relative",
        }}
      > */}
      <BiblePicker
        currentBook={props.currentBook}
        currentChapter={props.currentChapter}
        currentVerse={props.currentVerse}
        onSelectItem={(item) => props.changeBibleBook(item)}
        fontSize={props.fontSize}
        height={props.HEADER_HEIGHT}
        icon="magnify"
        // items={props.books}
        placeholder="Category"
        backgroundColor={colors.dark}
        PickerItemComponent={BiblePickerItem}
        // flex={1}
      />
      {/* </View> */}
      {/* <View style={{ alignItems: "flex-end", position: "absolute" }}>
        {sliderVisible ? (
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={12}
            maximumValue={24}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor={colors.primary}
            onSlidingComplete={handleSlide}
            step={2}
            value={props.fontSize}
            vertical
          />
        ) : null}
      </View> */}
    </Animated.View>
  );
}
