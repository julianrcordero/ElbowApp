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
    const { item, height, label, aspectRatio, flex, width } = this.props;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: item.backgroundColor, aspectRatio, height, flex },
        ]}
      >
        <AppText style={styles.text}>
          {/* {"A"} */}
          {/* {label} */}
        </AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
    // justifyContent: "center",
    width: "100%",
    // flexShrink: 1,
  },
  text: {
    // padding: 15,
    flexShrink: 1,
    // fontSize: RFPercentage(1),
    // fontSize: 20,
  },
});

export default BiblePickerItem;
