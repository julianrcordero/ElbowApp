import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import CreateScreen from "../screens/CreateScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

const CreateNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Create"
      mode="card"
      screenOptions={({ navigation }) => ({
        backgroundColor: colors.transparent,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={colors.white}
              size={40}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: colors.goldenrod,
          height: 60,
        },
        headerTintColor: colors.white,
        title: "",
      })}
    >
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerLeft: false,
        }}
      />
      <Stack.Screen
        name="CreatePost"
        // component={CreatePostScreen}
        children={() => (
          <CreatePostScreen bottomSheetRef={props.bottomSheetRef} map={props.map} />
        )}
      />
    </Stack.Navigator>
  );
};

export default CreateNavigator;
