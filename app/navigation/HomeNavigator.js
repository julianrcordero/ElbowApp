import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import colors from "../config/colors";
import ToursNavigator from "./ToursNavigator";
import LockerNavigator from "./LockerNavigator";
import MapScreen from "../screens/MapScreen";
import useApi from "../hooks/useApi";
import postsApi from "../api/posts";
import useNotifications from "../hooks/useNotifications";
const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  useNotifications();
  const getPostsApi = useApi(postsApi.getPosts);
  const searchPostsApi = useApi(postsApi.searchPosts);

  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.goldenrod,
          height: 60,
        },
        headerTintColor: colors.white,
        title: "",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tours" component={ToursNavigator} />
      <Stack.Screen name="Adventures" component={LockerNavigator} />
      <Stack.Screen
        name="Map"
        children={() => (
          <MapScreen
            // ref={props.mapView}
            bottomSheetRef={props.bottomSheetRef}
            bottomSheetContent={props.bottomSheetContent}
            carousel={props.carousel}
            getPostsApi={getPostsApi}
            map={props.map}
            mapView={props.mapView}
            ref={props.map}
            searchPostsApi={searchPostsApi}
            user={props.user}
          />
        )}
        options={{
          headerStyle: {
            backgroundColor: colors.transparent,
            height: 60,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
