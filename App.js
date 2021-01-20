import React, { useState } from "react";
import { Button, Dimensions, View, Switch, Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import Slider from "@react-native-community/slider";
import Screen from "./app/components/Screen";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import colors from "./app/config/colors";

import BottomSheetToolBar from "./app/components/BottomSheetToolBar";

// import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
const { height, width } = Dimensions.get("window");

//View -> UIView
export default function App() {
  const top = height - Constants.statusBarHeight;

  const [fontSize, setFontSize] = useState(16);
  const crossrefSize = 12; //fontSize * 0.6;
  const titleSize = fontSize * 1.5;
  const handleSlide = (value) => setFontSize(value);

  const [settingsMode, setSettingsMode] = useState(false);

  const renderSettingsHeader = () => (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.light,
        borderColor: colors.medium,
        borderTopWidth: 0.2,
        // flex: 1,
        flexDirection: "row",
        height: 50,
        justifyContent: "space-between",
        paddingHorizontal: 25,
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Text Settings</Text>

      <Button
        title="Done"
        onPress={() => {
          bottomSheetRef.current.snapTo(2);
        }}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderSettingsContent = () => (
    <View
      style={{
        backgroundColor: colors.light,
        height: top - 50,
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
        <Text style={styles.title}>{"Font"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Text style={styles.button}>Sans Serif</Text>
          <Text style={styles.button}>Serif</Text>
          <Text style={styles.button}>Slab Serif</Text>
        </View>
      </View>
      <View style={styles.settings}>
        <Text style={styles.title}>{"Formatting"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Text style={styles.button}>Default</Text>
          <Text style={styles.button}>Study</Text>
          <Text style={styles.button}>Reader</Text>
        </View>
      </View>
      <View
        style={[
          styles.settings,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={styles.title}>{"Show Cross References"}</Text>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
      <View
        style={[
          styles.settings,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={styles.title}>{"Dark Mode"}</Text>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
    </View>
  );

  const renderBibleHeader = () => (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.white,
        borderColor: colors.medium,
        borderTopWidth: 0.2,
        // flex: 1,
        flexDirection: "row",
        height: 50,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        // width: "100%",
      }}
    >
      <BottomSheetToolBar />
      <Button
        title="Done"
        onPress={() => {
          bottomSheetRef.current.snapTo(2);
        }}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderBibleContent = () => (
    <View
      style={{
        backgroundColor: colors.light,
        height: top - 50,
        borderTopWidth: 0.2,
        // alignItems: "center",
        // justifyContent: "center",
        paddingHorizontal: 50,
      }}
    >
      <View style={{ backgroundColor: "green" }}></View>
    </View>
  );

  const bottomSheetRef = React.useRef(null);

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
    <>
      <Screen>
        <NavigationContainer ref={navigationRef}>
          <AuthContext.Provider value={{ user, setUser }}>
            {user ? (
              <AppNavigator
                bottomSheetRef={bottomSheetRef}
                fontSize={fontSize}
                crossrefSize={crossrefSize}
                titleSize={titleSize}
                setSettingsMode={setSettingsMode}
              />
            ) : (
              <AuthNavigator />
            )}
          </AuthContext.Provider>
        </NavigationContainer>
      </Screen>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[top, "50%", "0%"]}
        initialSnap={1}
        renderHeader={settingsMode ? renderSettingsHeader : renderBibleHeader}
        renderContent={
          settingsMode ? renderSettingsContent : renderBibleContent
        }
        // onCloseEnd={() => setFocusedVerse(null)}
      />
    </>
  );
}

const styles = {
  settings: {
    marginTop: 25,
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.medium,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 6,
    paddingVertical: 6,
    textAlign: "center",
  },
  title: {
    marginVertical: 6,
  },
};
