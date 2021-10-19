import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";
import colors from "../../config/colors";

function AppFormField({
  name,
  width,
  // value, placeholder,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View style={{}}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        // placeholder={placeholder}
        style={{
          borderBottomWidth: 1,
          borderColor: colors.light,
          textAlign: "center",
          width: "60%",
          color: colors.medium,
          fontWeight: "700",
        }}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default AppFormField;
