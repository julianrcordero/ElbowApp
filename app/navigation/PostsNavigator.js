import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../screens/PostsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const PostsNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Posts" component={PostsScreen} />
    {/* <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={({ route }) => ({
        title: route.params.title,
        headerStyle: {
          height: 70,
        },
        headerShown: true,
      })}
    /> */}
  </Stack.Navigator>
);

export default PostsNavigator;
