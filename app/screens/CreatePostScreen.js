import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormInputBox as FormInputBox,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms/Index";
import colors from "../config/colors";
import postsApi from "../api/posts";
import AppButton from "../components/Button";

import * as FileSystem from "expo-file-system";

import FormImage from "../components/forms/FormImage";
import ImageInput from "../components/ImageInput";

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    ID: 1,
    title: "Photo",
    value: "image/jpeg",
    backgroundColor: "green",
    icon: "camera",
  },
];

function CreatePostScreen({ navigation }) {
  const getCreatedToursApi = useApi(postsApi.getCreatedTours);
  useEffect(() => {
    getCreatedToursApi.request();
  }, []);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUri, setImageUri] = useState();

  const setMarker = () => {
    bottomSheetRef.current?.snapTo(1);

    map.current?.setState((state) => {
      return {
        placeMarkerMode: true,
        placeMarkerCoordinate: {
          latitude: state.myLocation.latitude,
          longitude: state.myLocation.longitude,
        },
        region: {
          latitude: state.myLocation.latitude,
          longitude: state.myLocation.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
      };
    });
  };

  const handleSubmit = async (post, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    let location = map.current?.state.placeMarkerCoordinate;

    const result = await postsApi.addPost({ ...post, location }, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      // setUploadVisible(false);
      return alert("You are not authorized to upload");
    } else {
      const resultData = result.data;
      const postLink = resultData.fileURL;
      uploadPhoto(postLink, post);
      map.current?.setState({
        markerList: [
          ...map.current?.state.markerList,
          {
            id: resultData.id,
            latitude: resultData.location.lat,
            longitude: resultData.location.lon,
            title: resultData.category,
            description: resultData.hint,
            url: resultData.fileURL,
            tourID: resultData.tourID,
          },
        ],
        tourFilteredList: [
          ...map.current?.state.markerList,
          {
            id: resultData.id,
            latitude: resultData.location.lat,
            longitude: resultData.location.lon,
            title: resultData.category,
            description: resultData.hint,
            url: resultData.fileURL,
            tourID: resultData.tourID,
          },
        ],
        placeMarkerMode: false,
      });
    }
    resetForm();
  };

  const uploadPhoto = async (postLink, post) => {
    const path = post.images[0];
    const image = "";

    let headers = {
      "content-type": "image/jpeg",
      "x-amz-acl": "public-read",
      // Authorization: token
    };

    let options = {
      headers: headers,
      httpMethod: "PUT",
    };

    let upload = await FileSystem.uploadAsync(postLink, path, options);

    if (upload.status !== 200) {
      setUploadVisible(false);
      return alert("Could not save the post.");
    } else {
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.buttons}>
        <Form
          initialValues={{
            title: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              textAlign: "left",
              width: "100%",
            }}
          >
            Name Post:
          </Text>
          <Picker
            items={categories}
            name="category"
            numberOfColumns={3}
            placeholder="Category"
          />
          <Picker
            items={getCreatedToursApi.data.tours}
            name="tour"
            loadData={getCreatedToursApi.request}
            placeholder="Tour"
          />
          <ImageInput
            imageUri={imageUri}
            onChangeImage={(uri) => setImageUri(uri)}
          />
          <Text
            style={{
              textAlign: "left",
              color: colors.white,
              fontSize: 24,
              padding: 10,
              width: "100%",
            }}
          >
            Description:{" "}
          </Text>
          <FormInputBox
            icon="newspaper-variant-outline"
            maxLength={255}
            multiline
            name="description"
            height={75}
            numberOfLines={2}
            placeholder="What's so cool about this place?"
          />

          {/* <AppButton
            title="Set Marker"
            onPress={setMarker}
            color={"secondary"}
          ></AppButton> */}

          <SubmitButton title="Post" />
        </Form>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create a Post</Text>
          <MaterialCommunityIcons
            name={"plus"}
            color={colors.white}
            size={60}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={{ height: 30 }}></View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Create a Tour</Text>
          <MaterialCommunityIcons
            name={"plus"}
            color={colors.white}
            size={60}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.footer}>
        <View
          style={{ backgroundColor: "rgba(255,0,255, 0.6)", height: 70 }}
        ></View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => console.log("add")}
        >
          <MaterialCommunityIcons
            name="map-marker-plus-outline"
            color={colors.primary}
            size={55}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    width: "100%",
  },
  buttons: {
    alignItems: "center",
    backgroundColor: "rgba(255,0,255, 0.6)",
    flex: 1,
    paddingHorizontal: 55,
    paddingBottom: 70,
    paddingVertical: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "500",
  },
  container: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.primary,
    height: 70,
  },
  mapButton: {
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderColor: colors.goldenrod,
    borderRadius: 47.5,
    borderWidth: 5,
    bottom: 22.5,
    height: 95,
    justifyContent: "center",
    position: "absolute",
  },
});

export default CreatePostScreen;
