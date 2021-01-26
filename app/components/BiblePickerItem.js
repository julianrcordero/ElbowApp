import React, { PureComponent } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

class BiblePickerItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, height, onPress, label, aspectRatio, width } = this.props;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: item.backgroundColor, aspectRatio, height },
        ]}
      >
        <AppText style={styles.text}>{label}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    // padding: 15,
    fontSize: 14,
  },
});

export default BiblePickerItem;
