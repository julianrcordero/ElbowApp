import React, { PureComponent } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Screen from "./Screen";
import colors from "../config/colors";
import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BooksGridScreen from "../screens/BooksGridScreen";
import BooksListScreen from "../screens/BooksListScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import SegmentedControl from "@react-native-community/segmented-control";
import { NavigationContainer } from "@react-navigation/native";

export default class TopSheetNavigation extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    pickerType: 0,
    collapsed: true,
    searchHistory: [
      { id: 0, title: "monkey" },
      { id: 1, title: "giraffe" },
      { id: 2, title: "elephant" },
    ],
  };

  renderSearchItem = ({ item, index, separators }) => {
    return (
      <ListItem
        title={item.title}
        description={item.description}
        image={item.image}
        onPress={() => console.log("Message selected", item)}
        renderRightActions={() => (
          <ListItemDeleteAction onPress={() => handleDelete(item)} />
        )}
      />
    );
  };

  selectedPicker = () => {
    switch (this.state.pickerType) {
      case 0:
        return (
          // <View style={{ backgroundColor: "blue", height: 1000 }}></View>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: true }}
              style={{ elevation: 0 }}
            >
              <Stack.Screen
                name="Books"
                component={BooksGridScreen}
                options={{ headerShown: false, title: "Books" }}
              />

              <Stack.Screen
                name="Chapters"
                component={ChaptersGridScreen}
                options={({ route }) => ({
                  headerRight: () => (
                    <AppText style={styles.sectionTitle}>
                      {route.params.title}
                    </AppText>
                  ),
                  headerStyle: {
                    height: 55,
                  },
                  headerTitle: "",
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 1:
        return (
          // <View style={{ backgroundColor: "red", height: 1000 }}></View>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: true }}
              style={{ elevation: 0 }}
            >
              <Stack.Screen
                name="BooksList"
                // component={BooksListScreen}
                options={{ headerShown: false, title: "Books" }}
              >
                {(props) => (
                  <BooksListScreen
                    changeBibleBook={this.props.changeBibleBook}
                    close={() => this.setState({ collapsed: true })}
                    width={this.props.width - 30}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 2:
        return (
          <FlatList
            data={this.state.searchHistory}
            renderItem={this.renderSearchItem}
            keyExtractor={(item) => item.id}
          />
        );
      default:
        break;
    }
  };

  render() {
    return (
      //   <Screen style={{ position: "absolute", zIndex: 200, width: "100%" }}>
      // <View style={{ position: "relative" }}>
      <Collapsible
        align={"center"}
        collapsed={this.state.collapsed}
        // collapsedHeight={-70}
        style={{ backgroundColor: "blue" }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            height: 800, //height - top - 70 - getBottomSpace(),
            paddingHorizontal: 15,
            // marginHorizontal: 15,
            // width: "100%",
            // top: -70,
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.white,
              height: 70,
              justifyContent: "space-between",
              flexDirection: "row",
              // width: width ,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Select a Passage
            </Text>
            <Button
              title={"Cancel"}
              onPress={() => this.setState({ collapsed: true })}
            ></Button>
          </View>
          <SegmentedControl
            values={["GRID", "LIST", "RECENT"]}
            selectedIndex={this.state.pickerType}
            onChange={(event) => {
              this.setState({
                pickerType: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            style={{ backgroundColor: colors.light, height: 45 }}
          />
          {this.selectedPicker()}
        </View>
      </Collapsible>
      // </View>
      //   </Screen>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    alignItems: "center",
    aspectRatio: 0.8,
    // backgroundColor: "green",
    // flexShrink: 1,
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: colors.white,
    marginRight: 5,
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  reference: {
    alignItems: "center",
    // backgroundColor: "blue",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  referenceText: {
    flex: 1,
    color: colors.black,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
  },
  titleCard: {},
  translationText: {
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: colors.medium,
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});
