import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostTourScreen from "../screens/PostTourScreen";
import ToursScreen from "../screens/ToursScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const ToursNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Tours" component={ToursScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default ToursNavigator;
