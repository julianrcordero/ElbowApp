import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import MessagesScreen from "../screens/account/MessagesScreen";
import PostTourScreen from "../screens/PostTourScreen";
import SubscribeTourScreen from "../screens/SubscribeTourScreen";

const Stack = createStackNavigator();

const AccountNavigator = (props) => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="PostTour"
      // component={PostTourScreen}
      children={() => (
        <PostTourScreen
          setTourList={props.setTourList}
          tourList={props.tourList}
        />
      )}
    />
    <Stack.Screen name="SubscribeTour" component={SubscribeTourScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
