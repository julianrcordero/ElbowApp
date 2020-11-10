import React, { PureComponent } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

export default class VerseBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      collapsed: false,
    };
  }

  render() {
    const { content, onPress } = this.props;

    return (
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          {content}
          {/* <AppText style={styles.content}>{content}</AppText> */}
        </View>
      </View>
    );
  }
}

// function VerseBox({ content, onPress }) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.detailsContainer}>
//         {content}
//         {/* <AppText style={styles.content}>{content}</AppText> */}
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    // backgroundColor: colors.white,
    // marginBottom: 1,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: colors.light,
    flex: 1,
    paddingHorizontal: 25,
    // backgroundColor: colors.white,
  },
  detailsContainer: {
    // paddingHorizontal: 15,
  },
});

// export default VerseBox;
