import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import colors from "../config/colors";
import ToursNavigator from "./ToursNavigator";
const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator mode="card" screenOptions={{ title: "" }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerStyle: {
          backgroundColor: colors.goldenrod,
          height: 70,
        },
      }}
    />
    <Stack.Screen
      name="Tours"
      component={ToursNavigator}
      options={{
        headerStyle: {
          backgroundColor: colors.goldenrod,
          height: 70,
        },
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
