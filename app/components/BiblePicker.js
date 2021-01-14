import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Screen from "./Screen";
import { FlatList } from "react-native-gesture-handler";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

import { createStackNavigator } from "@react-navigation/stack";
import BooksScreen from "../screens/BooksScreen";
import ChaptersScreen from "../screens/ChaptersScreen";
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
  width,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { height: height - 1, width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={colors.black}
          style={styles.icon}
        />
      )}
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={{ flexDirection: "row" }}>
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
            size={20}
            color={defaultStyles.colors.dark}
            style={{
              // backgroundColor: "white",
              paddingHorizontal: 3,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
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
          {/* <Stack.Screen name="Chapters" component={ChaptersScreen} /> */}
        </Stack.Navigator>

        {/* <Screen style={styles.modal}>
          <Button
            title="Close"
            // style={{
            //   marginBottom: 10,
            // }}
            onPress={() => setModalVisible(false)}
          />
          <AppText>Old Testament</AppText>
          <FlatList
            data={items.slice(0, 39)}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            style={{
              paddingTop: 10,
              // marginHorizontal: 15
            }}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
          <AppText>New Testament</AppText>
          <FlatList
            data={items.slice(39, 66)}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            style={{
              paddingTop: 10,
              // marginHorizontal: 15
            }}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen> */}
      </Modal>
    </View>
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
  modal: {
    marginHorizontal: 15,
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
