import React, { useState } from "react";
import { InteractionManager, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as FileSystem from "expo-file-system";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms/Index";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import postsApi from "../api/posts";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  // title: Yup.string().required().min(1).label("Title"),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    label: "Photo",
    value: "image/jpeg",
    backgroundColor: "green",
    icon: "camera",
  },
  // { label: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
  // { label: "Camera", value: 3, backgroundColor: "blue", icon: "lock" },
];

function PostContentScreen({
  bottomSheetRef,
  description,
  markerList,
  setMarkerList,
  title,
}) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (post, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    console.log("location: ", location);

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

      setMarkerList([
        ...markerList,
        {
          id: resultData.id,
          latitude: resultData.location.lat,
          longitude: resultData.location.lon,
          title: resultData.category,
          description: resultData.hint,
          url: resultData.fileURL,
        },
      ]);
    }

    resetForm();

    bottomSheetRef.current.snapTo(2);

    // verseCard.setState({ editing: false });
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

    // console.log("result: ", upload);
    if (upload.status !== 200) {
      setUploadVisible(false);
      return alert("Could not save the post.");
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: title,
          description: description,
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <FormField
          maxLength={45}
          name="title"
          placeholder="Title"
          icon="rename-box"
        /> */}
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />

        <FormField
          icon="newspaper-variant-outline"
          maxLength={255}
          multiline
          name="description"
          height={100}
          numberOfLines={3}
          placeholder="Description"
        />

        <FormImagePicker name="images" />

        <SubmitButton title="Post" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
    // flex: 1,
    padding: 10,
  },
});
export default PostContentScreen;
