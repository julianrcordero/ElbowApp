import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import MessagesScreen from "../screens/account/MessagesScreen";
import PostTourScreen from "../screens/PostTourScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="PostTour" component={PostTourScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
