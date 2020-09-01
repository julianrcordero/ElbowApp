import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../Text";
import colors from "../../config/colors";
import Collapse from "accordion-collapse-react-native/build/components/Collapse";
import CollapseHeader from "accordion-collapse-react-native/build/components/CollapseHeader";
import CollapseBody from "accordion-collapse-react-native/build/components/CollapseBody";

function BibleListItem({
  title,
  description,
  type,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <Collapse>
          <CollapseHeader>
            <View style={styles.container}>
              {IconComponent}
              {image && <Image style={styles.image} source={image} />}
              <View style={styles.detailsContainer}>
                <AppText style={styles.title} numberOfLines={1}>
                  {title}
                </AppText>
                {type && (
                  <AppText style={styles.type} numberOfLines={1}>
                    {type}
                  </AppText>
                )}
              </View>
              <MaterialCommunityIcons
                color={colors.medium}
                name="chevron-right"
                size={25}
              />
            </View>
          </CollapseHeader>
          <CollapseBody>
            <AppText>
              {description && (
                <AppText style={styles.description} numberOfLines={2}>
                  {description}
                </AppText>
              )}
            </AppText>
          </CollapseBody>
        </Collapse>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
  description: {
    color: colors.gray,
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 30,
    height: 30,
    // borderRadius: 25,
  },
  title: {
    fontWeight: "500",
    fontSize: 15,
    color: "#53A7F2",
  },
  type: {
    fontWeight: "500",
    fontSize: 10,
  },
});

export default BibleListItem;
