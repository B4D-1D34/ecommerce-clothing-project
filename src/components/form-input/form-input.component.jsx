import React from "react";
import {
  FormInputContainer,
  GroupContainer,
  FormInputLabelContainer,
} from "./form-input.styles";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {label ? (
      <FormInputLabelContainer contentLength={otherProps.value.length}>
        {label}
      </FormInputLabelContainer>
    ) : null}
  </GroupContainer>
);

export default FormInput;
