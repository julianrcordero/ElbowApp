import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import AppButton from "../Button";

function SubmitButton({ title, disabled }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      disabled={disabled}
      // style={{ backgroundColor: disabled ? "red" : "green" }}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
