import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BibleScreen from "../screens/BibleScreen";
import BibleListingDetailsScreen from "../screens/BibleListingDetailsScreen";
import BibleTestScreen from "../screens/BibleTestScreen";
import SingleVerseScreen from "../screens/SingleVerseScreen";

const Stack = createStackNavigator();

const BibleNavigator = (props) => (
  <Stack.Navigator initialRouteName="Bible">
    {/* <Stack.Screen
      name="Bible"
      children={() => (
        <BibleScreen
          HEADER_HEIGHT={props.HEADER_HEIGHT}
          scrollY={props.scrollY}
          diffClampY={props.diffClampY}
          headerY={props.headerY}
          navigation={this.navigation}
        />
      )}
    /> */}
    <Stack.Screen
      name="Bible"
      component={(props) => (
        <BibleScreen
          HEADER_HEIGHT={props.HEADER_HEIGHT}
          scrollY={props.scrollY}
          diffClampY={props.diffClampY}
          headerY={props.headerY}
          // navigation={this.navigation}
        />
      )}
    />
    <Stack.Screen name="SingleVerse" component={SingleVerseScreen} />
  </Stack.Navigator>
);

export default BibleNavigator;
