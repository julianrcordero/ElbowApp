import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  bibleText: {
    color: colors.medium,
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    lineHeight: 32,
    // textAlign: "justify",
  },
};
