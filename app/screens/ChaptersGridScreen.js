import React, { PureComponent } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import BiblePickerItem from "../components/BiblePickerItem";

class ChaptersGridScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { close, chapters, route } = this.props;

    const { gridChapters } = route ? route.params : 0;

    const chapterNum = gridChapters ?? chapters;
    const DATA = [];

    for (let i = 0; i < chapterNum; i++) {
      DATA.push({
        id: i,
        backgroundColor: "#FFFB79",
        title: i + 1,
        short: i + 1,
      });
    }

    return (
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={7}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={close}>
            <BiblePickerItem item={item} label={item.short} flex={1 / 7} />
          </TouchableOpacity>
        )}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          width: "14.2857%",
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default ChaptersGridScreen;
