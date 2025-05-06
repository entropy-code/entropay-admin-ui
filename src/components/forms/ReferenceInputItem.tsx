import * as React from "react";
import { ReferenceInput, SelectInput, useRecordContext } from "react-admin";

const ReferenceInputItem = ({
  referenceValues,
}: {
  referenceValues: {
    source: string;
    reference: string;
    optionText: string;
    required?: boolean;
    disabledCheck?: (record: any) => boolean;
    sortField?: string;
    sortOrder?: "ASC" | "DESC";
    filter?: object;
  };
}) => {
  const {
    source,
    reference,
    optionText,
    required,
    disabledCheck,
    sortField,
    sortOrder,
    filter,
  } = referenceValues;
  const record = useRecordContext();
  var setDisabled = false;
  if (disabledCheck !== undefined && record !== undefined) {
    setDisabled = disabledCheck(record.source);
  }
  return (
    <>
      {referenceValues && (
        <ReferenceInput
          source={source}
          reference={reference}
          perPage={100}
          sort={{ field: sortField ?? "id", order: sortOrder ?? "ASC" }}
          filter={filter}
        >
          <SelectInput
            optionText={optionText}
            required={required}
            readOnly={setDisabled}
            fullWidth
          />
        </ReferenceInput>
      )}
    </>
  );
};

export default ReferenceInputItem;
