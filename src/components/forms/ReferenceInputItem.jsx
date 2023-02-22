import * as React from "react";
import { ReferenceInput, SelectInput } from "react-admin";

const ReferenceInputItem = ({ referenceValues }) => {
  const { source, reference, optionText, required } = referenceValues;
  return (
    <>
      {referenceValues && (
        <ReferenceInput source={source} reference={reference}>
          <SelectInput optionText={optionText} required={required} fullWidth />
        </ReferenceInput>
      )}
    </>
  );
};

export default ReferenceInputItem;
