import React, { useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  // Modal,
  Button,
  Text,
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
  // height,
  icon,
  onSelectItem,
  placeholder,
  // width,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CollapsibleView
      title={
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
      }
      collapsibleContainerStyle={{ position: "absolute", top: "100%" }}
      style={{ width: width }}
      noArrow
    >
      <View style={{ backgroundColor: "red", height: 200, width: 300 }}></View>
      {/* <Stack.Navigator
        // mode="card"
        screenOptions={{ headerShown: false }}
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
      </Stack.Navigator> */}
    </CollapsibleView>
    // <View
    //   style={[
    //     styles.container,
    //     {
    //       // height: height - 1,
    //       width,
    //     },
    //   ]}
    // >
    //   {icon && (
    //     <MaterialCommunityIcons
    //       name={icon}
    //       size={24}
    //       color={colors.black}
    //       style={styles.icon}
    //     />
    //   )}
    //   <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
    //     <View style={{ flexDirection: "row" }}>
    //       <Text style={{ fontSize: fontSize }}>
    //         {currentBook ? (
    //           <AppText style={[styles.text]}>
    //             {
    //               currentBook.label + " " + currentChapter // +" : " +currentVerse
    //             }
    //           </AppText>
    //         ) : (
    //           <AppText style={styles.placeholder}>{placeholder}</AppText>
    //         )}
    //       </Text>
    //       <MaterialCommunityIcons
    //         name="chevron-down"
    //         size={20}
    //         color={defaultStyles.colors.dark}
    //         style={{
    //           // backgroundColor: "white",
    //           paddingHorizontal: 3,
    //         }}
    //       />
    //     </View>
    //   </TouchableWithoutFeedback>
    // </View>
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
  icon: {
    marginRight: 10,
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
