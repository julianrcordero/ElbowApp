import React, { PureComponent } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import PanelBox from "./PanelBox";
import AppText from "./Text";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostContentScreen from "../screens/PostContentScreen";
import AppButton from "./Button";
import useLocation from "../hooks/useLocation";
import { useState } from "react";
import postsApi from "../api/posts";

export default function PostCard({
  currentBook,
  item,
  fontSize,
  height,
  crossRefSize,
  bottomSheetRef,
  markerList,
  setMarkerList,
}) {
  // this.state = {
  //   loved: false,
  //   editing: false,
  // };

  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUnlock = async () => {
    setProgress(0);
    setUploadVisible(true);

    const result = await postsApi.unlockListing(item, location, (progress) =>
      setProgress(progress)
    );
    console.log(result);

    if (!result.ok) {
      // setUploadVisible(false);
      // console.log(result);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
      ]);
    } else {
      const resultData = result.data;
      // console.log(resultData);

      // const postLink = resultData.fileURL;
      // uploadPhoto(postLink, post);

      // setMarkerList([
      //   ...markerList,
      //   {
      //     id: resultData.id,
      //     latitude: resultData.location.lat,
      //     longitude: resultData.location.lon,
      //     title: resultData.category,
      //     description: resultData.hint,
      //     url: resultData.fileURL,
      //   },
      // ]);
    }

    // verseCard.setState({ editing: false });
  };

  return (
    <View style={{ backgroundColor: "cyan", height: height }}>
      <View
        style={{
          alignItems: "center",
          height: 50,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <AppText
            style={{
              fontSize: fontSize,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {item.description + " (" + item.title + ")"}
          </AppText>
          {/* <AppButton
                  title={"Edit"}
                  onPress={() => {
                    console.log("Edit clicked");
                    this.setState({ editing: true });
                  }}
                /> */}
          <MaterialCommunityIcons name="lock" color={colors.black} size={28} />
        </View>
      </View>
      {item.url ? (
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: item.url }}
          uri={item.url} //imageUrl}
        />
      ) : (
        <AppButton title={"Unlock"} onPress={handleUnlock} />
      )}
      {/* <PanelBox
              fontSize={fontSize}
              verseContent={item.description}
              johnsNote={item.johnsNote}
              crossrefs={item.crossrefs}
              crossRefSize={crossRefSize}
              bottomSheetRef={bottomSheetRef}
            ></PanelBox> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
