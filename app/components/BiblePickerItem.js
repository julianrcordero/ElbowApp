import React, { PureComponent } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class BiblePickerItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      aspectRatio = 1,
      borderWidth = 1,
      flex,
      height,
      item,
      label,
      onPress,
      width = "100%",
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: item.backgroundColor,
            borderWidth,
            aspectRatio,
            height,
            flex,
            width,
          },
        ]}
      >
        <AppText style={styles.text}>
          {/* {"A"} */}
          {label}
        </AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: "red", //colors.white,
    justifyContent: "center",
  },
  text: {
    // padding: 15,
    // flexShrink: 1,
    // fontSize: RFPercentage(1),
    // fontSize: 20,
  },
});

export default BiblePickerItem;
