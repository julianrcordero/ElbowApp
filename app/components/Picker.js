import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  loadData,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    if (loadData) {
      loadData();
    }
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    // <AppText style={{ backgroundColor: "green" }}>{item.title}</AppText>
    <PickerItemComponent
      item={item}
      label={item.title}
      onPress={() => {
        setModalVisible(false);
        onSelectItem(item);
      }}
    />
  );

  const keyExtractor = (item) => item.ID;

  const none = {
    ID: "fakeID",
    title: "None",
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={openModal}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.title}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={keyExtractor}
            // numColumns={numberOfColumns}
            renderItem={renderItem}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary, //defaultStyles.colors.light,
    borderRadius: 15,
    flexDirection: "row",
    height: 50,
    padding: 15,
    marginVertical: 10,
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
  },
});

export default AppPicker;
