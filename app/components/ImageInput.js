import React, { useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { useFormikContext } from "formik";

function ImageInput({ name, onChangeImage }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const imageUri = values[name][0];

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    // const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.LOCATION);
    // result.granted
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        setFieldValue(name, [result.uri]);
      }
    } catch (error) {}
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    aspectRatio: 1,
    height: 150,
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
