import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import BibleScreen from "../screens/BibleScreen";

import NewListingButton from "./NewListingButton";
import useNotifications from "../hooks/useNotifications";
import Animated from "react-native-reanimated";
import MenuButton from "../components/MenuButton";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const HEADER_HEIGHT = 70;
const scrollY = new Animated.Value(0);
const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
const headerY = Animated.interpolate(diffClampScrollY, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT],
});

const navigationY = Animated.multiply(headerY, -1);

const AppNavigator = (props) =>
  // { user }
  {
    useNotifications();

    return (
      <Tab.Navigator
        initialRouteName="Bible"
        swipeEnabled
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{}}
      >
        <Tab.Screen
          name="Home"
          component={FeedNavigator}
          options={{
            tabBarIcon: "home",
          }}
        />
        <Tab.Screen
          name="Bible"
          children={() => (
            <BibleScreen
              carousel={props.carousel}
              currentBook={props.currentBook}
              HEADER_HEIGHT={HEADER_HEIGHT}
              scrollY={scrollY}
              headerY={headerY}
              fontSize={props.fontSize}
              crossrefSize={props.crossrefSize}
              titleSize={props.titleSize}
              bottomSheetRef={props.bottomSheetRef}
              setCurrentBook={props.setCurrentBook}
              setSettingsMode={props.setSettingsMode}
              setVerseList={props.setVerseList}
              verseList={props.verseList}
            />
          )}
          options={{
            tabBarIcon: "book-open-page-variant",
          }}
        />
        <Tab.Screen
          name="John's Notes"
          component={ListingEditScreen}
          options={{
            tabBarIcon: "library-books",
          }}
        />
        <Tab.Screen
          name="More"
          component={AccountNavigator}
          options={{
            tabBarIcon: "menu",
          }}
        />
      </Tab.Navigator>
    );
  };

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <Animated.View
      style={{
        borderColor: colors.medium,
        borderTopWidth: 0.2,
        flexDirection: "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        backgroundColor: colors.light,
        transform: [{ translateY: navigationY }],
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <MenuButton
            key={route.key}
            title={label}
            icon={icon} //{require("./app/assets/home.png")}
            onPress={onPress}
            color={isFocused ? colors.medium : colors.black}
          ></MenuButton>
        );
      })}
    </Animated.View>
  );
}

export default AppNavigator;
