import * as React from "react";
import { ReferenceInput, SelectInput } from "react-admin";

const ReferenceInputItem = ({ referenceValues }) => {
  const { source, reference, optionText } = referenceValues;
  return (
    <>
      {referenceValues && (
        <ReferenceInput source={source} reference={reference}>
          <SelectInput optionText={optionText} isRequired fullWidth />
        </ReferenceInput>
      )}
    </>
  );
};

export default ReferenceInputItem;
