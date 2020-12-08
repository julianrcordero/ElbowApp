import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  bibleText: {
    color: colors.medium, //cau
    // fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    // lineHeight: 32,
    // textAlign: "justify",
  },
  macArthurText: {
    color: colors.medium,
    // fontSize: 13,
    fontFamily: Platform.OS === "android" ? "normal" : "Georgia-Italic",
  },
};
