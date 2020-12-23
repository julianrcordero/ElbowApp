import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  StyleSheet,
} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import dashboardApi from "../api/dashboard";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

function DashboardScreen({ navigation }) {
  const getDashboardApi = useApi(dashboardApi.getDashboard);

  useEffect(() => {
    getDashboardApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      {getDashboardApi.error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={getDashboardApi.request} />
        </>
      )}
      <ActivityIndicator visible={getDashboardApi.loading} />
      <Indicator animating={getDashboardApi.loading} size={"large"} />
      <FlatList
        data={getDashboardApi.data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Card
            title={item.Title}
            subTitle={item.Scripture}
            imageUrl={item.ImageUrl}
            // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={item.ImageUrl}
            // data.append("Title", dashboardItem.Title);
            // data.append("Scripture", dashboardItem.Scripture);
            // // data.append("categoryId", dashboardItem.category.value);
            // data.append("description", dashboardItem.description);

            // // dashboardItem.images.forEach((image, index) =>
            // data.append("images", {
            //   name: dashboardItem.Title, //"image" + index,
            //   type: "image/jpeg",
            //   uri: dashboardItem.SeriesImage,
            // });
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default DashboardScreen;
