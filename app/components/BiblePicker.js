import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  Picker,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Screen from "./Screen";
import { FlatList } from "react-native-gesture-handler";
import PickerItem from "./PickerItem";
import colors from "../config/colors";
import BiblePickerItem from "./BiblePickerItem";

function BiblePicker({
  currentBook,
  height,
  icon,
  items,
  numberOfColumns,
  onSelectItem,
  PickerItemComponent = BiblePickerItem,
  placeholder,
  selectedItem,
  width,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width, height }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={colors.black}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.dark}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={styles.modal}>
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
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    // borderRadius: 25,
    flexDirection: "row",
    // height: 70,
    paddingHorizontal: 15,
    // marginVertical: 10,
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
