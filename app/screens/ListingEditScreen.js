import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms/Index";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  { label: "Furniture", value: 1, backgroundColor: "red", icon: "apps" },
  { label: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
  { label: "Camera", value: 3, backgroundColor: "blue", icon: "lock" },
];

function ListingEditScreen({
  description,
  markerList,
  setMarkerList,
  title,
  verseCard,
}) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);

    setUploadVisible(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5,
        };

        const newMarkerList = [
          ...markerList,
          {
            id: markerList.length,
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            title: listing.title,
            description: listing.description,
            images: [listing.images],
          },
        ];
        setMarkerList(newMarkerList);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
    // const result = await listingsApi.addListing(
    //   { ...listing, location },
    //   (progress) => setProgress(progress)
    // );

    // if (!result.ok) {
    //   setUploadVisible(false);
    //   return alert("Could not save the listing.");
    // }

    resetForm();

    verseCard.setState({ editing: false });
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
          name="title"
          placeholder="Title"
          icon="rename-box"
        />

        <FormField
          icon="newspaper-variant-outline"
          maxLength={255}
          multiline
          name="description"
          height={100}
          // numberOfLines={3}
          placeholder="Description"
        />

        <FormImagePicker name="images" />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <SubmitButton title="Post" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
export default ListingEditScreen;
