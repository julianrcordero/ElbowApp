import React, { useState } from "react";
import { Button, Dimensions, View, Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Slider from "@react-native-community/slider";
import Screen from "./app/components/Screen";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
// import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import BottomSheet from "reanimated-bottom-sheet";
import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
import colors from "./app/config/colors";

//View -> UIView
export default function App() {
  const { height, width } = Dimensions.get("window");
  const top = height - Constants.statusBarHeight;

  const [fontSize, setFontSize] = useState(16);
  const crossrefSize = 12; //fontSize * 0.6;
  const titleSize = fontSize * 1.5;
  const handleSlide = (value) => setFontSize(value);

  const renderSettingsHeader = () => (
    <View
      style={{
        backgroundColor: colors.white,
        borderColor: colors.medium,
        borderTopWidth: 0.2,
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 25,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Text Settings</Text>
    </View>
  );

  const renderSettingsContent = () => (
    <View
      style={{
        backgroundColor: colors.light,
        height: (top - 50) / 2,
        borderTopWidth: 0.2,
        // alignItems: "center",
        // justifyContent: "center",
        paddingHorizontal: 50,
      }}
    >
      <View style={styles.settings}>
        <Text>{"Text Size: " + fontSize + "pt"}</Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          minimumTrackTintColor={colors.medium}
          maximumTrackTintColor={colors.primary}
          onSlidingComplete={handleSlide}
          step={2}
          value={fontSize}
          // vertical
        />
      </View>
      <View style={styles.settings}>
        <Text>{"Font"}</Text>
      </View>
      <View style={styles.settings}>
        <Text>{"Formatting"}</Text>
      </View>
      <View style={styles.settings}>
        <Text>{"Show Cross References"}</Text>
      </View>
      <View style={styles.settings}>
        <Text>{"Dark"}</Text>
      </View>
    </View>
  );

  const settingsRef = React.useRef(null);

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    // <View style={{ backgroundColor: "black" }}>
    <Screen>
      <NavigationContainer ref={navigationRef}>
        <AuthContext.Provider value={{ user, setUser }}>
          {user ? (
            <AppNavigator
              settingsRef={settingsRef}
              fontSize={fontSize}
              crossrefSize={crossrefSize}
              titleSize={titleSize}
            />
          ) : (
            <AuthNavigator />
          )}
        </AuthContext.Provider>
      </NavigationContainer>
      <BottomSheet
        ref={settingsRef}
        snapPoints={[top / 2, 0]}
        initialSnap={0}
        renderHeader={renderSettingsHeader}
        renderContent={renderSettingsContent}
        // onCloseEnd={() => setFocusedVerse(null)}
      />
    </Screen>
  );
}

const styles = {
  settings: { marginTop: 25, width: "100%" },
};
