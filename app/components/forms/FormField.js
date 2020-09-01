import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({
  name,
  width,
  // value, placeholder,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        // placeholder={placeholder}
        // style={placeholder ? { flex: 1 } : { flex: 0 }}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
