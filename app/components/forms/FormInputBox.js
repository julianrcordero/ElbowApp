import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";
import colors from "../../config/colors";

function AppFormInputBox({
  name,
  width,
  // value,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View
      style={{
        borderColor: colors.white,
        borderRadius: 7.5,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: "100%",
      }}
    >
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        style={{
          color: colors.medium,
          //   flex: 1,
          fontWeight: "700",
          //   textAlign: "center",
          //   width: "60%",
        }}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default AppFormInputBox;
