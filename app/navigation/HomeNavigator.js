import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import colors from "../config/colors";
import ToursNavigator from "./ToursNavigator";
import LockerNavigator from "./LockerNavigator";
const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    mode="card"
    screenOptions={{
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: colors.goldenrod,
        height: 60,
      },
      title: "",
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Tours" component={ToursNavigator} />
    <Stack.Screen name="Adventures" component={LockerNavigator} />
  </Stack.Navigator>
);

export default HomeNavigator;
