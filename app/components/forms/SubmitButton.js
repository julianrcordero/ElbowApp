import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import AppButton from "../Button";
import colors from "../../config/colors";

function SubmitButton({ title, disabled }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      disabled={disabled}
      // style={styles.submitButton}
      color={"white"}
      onPress={handleSubmit}
      textColor={"primary"}
    />
    // <AppButton
    //       title="Login"
    //       onPress={navigateToLogin}
    //       color="white"
    //       textColor="primary"
    //     ></AppButton>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: 40,
  },
});

export default SubmitButton;
