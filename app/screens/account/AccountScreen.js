import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ListItem from "../../components/lists/ListItem";
import ListItemSeparator from "../../components/lists/ListItemSeparator";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import AuthContext from "../../auth/context";

import { Auth } from "aws-amplify";

const menuItems = [
  {
    title: "Add a Tour",
    icon: {
      name: "map-marker-path",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.POST_TOUR,
  },
  {
    title: "Subscribe to a Tour",
    icon: {
      name: "map-marker-check-outline",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.SUBSCRIBE_TOUR,
  },
];

function AccountScreen({ navigation }) {
  // const [user, setUser] = useState({ name: "Name", email: "test@test.com" });
  const { user, setUser } = useContext(AuthContext);

  const getUser = async () => {
    const userInfo = await Auth.currentUserInfo();
    setUser(userInfo.attributes);
    return userInfo;
  };

  const logOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {}

    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../../assets/ElbowText.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={logOut}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
