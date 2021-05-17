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
  id: Yup.string().required().min(1).label("Tour ID"),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  //   description: Yup.string().required().label("Description"),
  //   category: Yup.object().required().nullable().label("Category"),
  //   images: Yup.array().min(1, "Please select at least one image."),
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

export default function SubscribeTourScreen({
  bottomSheetRef,
  description,
  map,
  title,
}) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (tour, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await postsApi.subscribeTour(
      { ...tour, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return alert(result.data);
    } else {
      const resultData = result.data;
      console.log(resultData);
      //   const postLink = resultData.fileURL;
      //   uploadPhoto(postLink, post);

      //   setMarkerList([
      //     ...markerList,
      //     {
      //       id: resultData.id,
      //       latitude: resultData.location.lat,
      //       longitude: resultData.location.lon,
      //       title: resultData.category,
      //       description: resultData.hint,
      //       url: resultData.fileURL,
      //     },
      //   ]);
    }

    resetForm();

    // bottomSheetRef.current?.snapTo(2);

    // verseCard.setState({ editing: false });
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
        <FormField
          maxLength={45}
          name="id"
          placeholder="Tour ID"
          icon="rename-box"
        />
        {/* <Picker
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
        /> */}

        {/* <FormImagePicker name="images" /> */}

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
