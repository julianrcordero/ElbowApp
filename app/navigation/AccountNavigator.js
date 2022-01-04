import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import PostTourScreen from "../screens/PostTourScreen";
import SubscribeTourScreen from "../screens/SubscribeTourScreen";

const Stack = createStackNavigator();

const AccountNavigator = (props) => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen
      name="PostTour"
      // component={PostTourScreen}
      children={() => <PostTourScreen />}
    />
    <Stack.Screen name="SubscribeTour" component={SubscribeTourScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
