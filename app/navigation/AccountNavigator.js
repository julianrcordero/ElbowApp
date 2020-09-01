import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import MessagesScreen from "../screens/account/MessagesScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
