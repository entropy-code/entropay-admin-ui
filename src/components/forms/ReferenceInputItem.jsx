import * as React from "react";
import { ReferenceInput, SelectInput, useRecordContext } from "react-admin";

const ReferenceInputItem = ({ referenceValues }) => {
  const { source, reference, optionText, required, check } = referenceValues;
  const record = useRecordContext();
  var setDisabled = false;
  if (check !== undefined) setDisabled = check(record);
  return (
    <>
      {referenceValues && (
        <ReferenceInput source={source} reference={reference}>
          <SelectInput
            optionText={optionText}
            required={required}
            disabled={setDisabled}
            fullWidth
          />
        </ReferenceInput>
      )}
    </>
  );
};

export default ReferenceInputItem;
