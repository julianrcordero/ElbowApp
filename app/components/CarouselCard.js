import React, { PureComponent } from "react";
import {
  Alert,
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
import { Component } from "react";

export default class CarouselCard extends PureComponent {
  constructor(props) {
    super(props);
  }
  // this.state = {
  //   loved: false,
  //   editing: false,
  // };

  componentDidMount() {
    this.getCurrentLocation();
  }

  state = {
    location: {
      latitude: 34.2709266,
      longitude: -118.5139665,
    },
    progress: 0,
    uploadVisible: false,
  };

  // const location = useLocation();

  async getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let location = {
          lat: parseFloat(position.coords.latitude),
          lon: parseFloat(position.coords.longitude),
        };
        this.setState({
          location: location,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }

  handleUnlock = async () => {
    this.setState({ progress: 0, uploadVisible: true });

    console.log("attempting to unlock from", this.state.location);
    const result = await postsApi.unlockListing(
      this.props.item,
      // this.state.location,
      { lat: 34.26626838473331, lon: -118.3768829221343 },
      (progress) => this.setState({ progress: progress })
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return Alert.alert(result.data.message, result.data.reason, [
        { text: "OK", onPress: () => console.log("") },
        // { text: "No", onPress: () => console.log("No") },
      ]);
    } else {
      const resultData = result.data;
      console.log(("resultData", resultData));
      this.props.map.current.showLockerPosts(); //.current.setState({tourFilteredList: })

      const interactionPromise = InteractionManager.runAfterInteractions(() => {
        let myIndex = this.props.map.current.state.tourFilteredList.findIndex(
          (obj) => obj.id === resultData.PostID
        );

        setTimeout(() => {
          this.props.carousel.current.scrollToIndex({
            animated: false,
            index: myIndex,
          });
        });
      });
      () => interactionPromise.cancel();
    }

    // verseCard.setState({ editing: false });
  };

  render() {
    const {
      currentBook,
      item,
      fontSize,
      height,
      crossRefSize,
      bottomSheetRef,
      width,
    } = this.props;

    return (
      <View
        style={{
          // backgroundColor: "cyan",
          height: height,
          marginVertical: 15,
          paddingHorizontal: 30,
          width: width,
        }}
      >
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
            {!item.url && (
              <MaterialCommunityIcons
                name="lock"
                color={colors.black}
                size={28}
              />
            )}
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
          <AppButton title={"Unlock"} onPress={this.handleUnlock} />
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
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});

// export default function CarouselCard({
//   currentBook,
//   item,
//   fontSize,
//   height,
//   crossRefSize,
//   bottomSheetRef,
//   width,
// }) {
//   // this.state = {
//   //   loved: false,
//   //   editing: false,
//   // };

//   const location = useLocation();
//   const [uploadVisible, setUploadVisible] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleUnlock = async () => {
//     setProgress(0);
//     setUploadVisible(true);

//     const result = await postsApi.unlockListing(item, location, (progress) =>
//       setProgress(progress)
//     );

//     if (!result.ok) {
//       // setUploadVisible(false);
//       return Alert.alert(result.data.message, result.data.reason, [
//         { text: "OK", onPress: () => console.log("") },
//         // { text: "No", onPress: () => console.log("No") },
//       ]);
//     } else {
//       const resultData = result.data;
//     }

//     // verseCard.setState({ editing: false });
//   };

//   return (
//     <View
//       style={{
//         // backgroundColor: "cyan",
//         height: height,
//         marginVertical: 15,
//         paddingHorizontal: 30,
//         width: width,
//       }}
//     >
//       <View
//         style={{
//           alignItems: "center",
//           height: 50,
//           flexDirection: "row",
//           justifyContent: "flex-start",
//         }}
//       >
//         <View
//           style={{
//             alignItems: "center",
//             flex: 1,
//             justifyContent: "space-between",
//             flexDirection: "row",
//           }}
//         >
//           <AppText
//             style={{
//               fontSize: fontSize,
//               fontWeight: "bold",
//               textAlign: "left",
//             }}
//           >
//             {item.description + " (" + item.title + ")"}
//           </AppText>
//           {/* <AppButton
//                   title={"Edit"}
//                   onPress={() => {
//                     console.log("Edit clicked");
//                     this.setState({ editing: true });
//                   }}
//                 /> */}
//           {!item.url && (
//             <MaterialCommunityIcons
//               name="lock"
//               color={colors.black}
//               size={28}
//             />
//           )}
//         </View>
//       </View>
//       {item.url ? (
//         <Image
//           style={styles.image}
//           tint="light"
//           preview={{ uri: item.url }}
//           uri={item.url} //imageUrl}
//         />
//       ) : (
//         <AppButton title={"Unlock"} onPress={handleUnlock} />
//       )}
//       {/* <PanelBox
//               fontSize={fontSize}
//               verseContent={item.description}
//               johnsNote={item.johnsNote}
//               crossrefs={item.crossrefs}
//               crossRefSize={crossRefSize}
//               bottomSheetRef={bottomSheetRef}
//             ></PanelBox> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     width: "100%",
//     height: 200,
//   },
// });
