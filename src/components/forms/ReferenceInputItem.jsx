import * as React from "react";
import { ReferenceInput, SelectInput, useRecordContext } from "react-admin";

const ReferenceInputItem = ({ referenceValues }) => {
  const { source, reference, optionText, required, disabledCheck, sortField, sortOrder } = referenceValues;
  const record = useRecordContext();
  var setDisabled = false;
  if (disabledCheck !== undefined && record !== undefined) {
    setDisabled = disabledCheck(record.source);
   }
  return (
    <>
      {referenceValues && (
        <ReferenceInput source={source} reference={reference} perPage={100}
                        sort={{ field: sortField?? "id", order: sortOrder?? "ASC" }}>
          <SelectInput optionText={optionText} required={required} disabled={setDisabled} fullWidth />
        </ReferenceInput>
      )}
    </>
  );
};

export default ReferenceInputItem;
