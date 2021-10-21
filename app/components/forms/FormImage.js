import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInput from "../ImageInput";

function FormImage({ name }) {
  const { errors, setFieldValue, touched, value } = useFormikContext();
  const imageUri = value;

  const handleAdd = (uri) => {
    setFieldValue(name, uri); //copy of array
  };

  //   const handleRemove = (uri) => {
  //     setFieldValue(
  //       name,
  //       imageUris.filter((imageUri) => imageUri !== uri)
  //     );
  //   };

  return (
    <View style={{ height: 100 }}>
      <ImageInput
        imageUri={imageUri}
        onChangeImage={(uri) => handleAdd(uri)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}
export default FormImage;
