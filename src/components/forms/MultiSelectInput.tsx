import * as React from "react";
import { ChipField, ReferenceArrayInput, SelectArrayInput } from "react-admin";

const ReferenceSelectArrayInputItem = ({
  referenceValues,
}: {
  referenceValues: {
    source: string;
    reference: string;
    sortField?: string;
    sortOrder?: "ASC" | "DESC";
  };
}) => {
  const { source, reference, sortField, sortOrder } = referenceValues;
  return (
    <div id="multi-select-field">
      {referenceValues && (
        <ReferenceArrayInput
          reference={reference}
          source={source}
          perPage={100}
          sort={{ field: sortField ?? "id", order: sortOrder ?? "ASC" }}
        >
          <SelectArrayInput fullWidth defaultValue={[]}>
            <ChipField source={source} />
          </SelectArrayInput>
        </ReferenceArrayInput>
      )}
    </div>
  );
};

export default ReferenceSelectArrayInputItem;
