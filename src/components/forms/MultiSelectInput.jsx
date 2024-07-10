import * as React from "react";
import { ChipField, ReferenceArrayInput, SelectArrayInput} from "react-admin";

const ReferenceSelectArrayInputItem = ({ referenceValues }) => {
  const { source, reference, sortField, sortOrder} = referenceValues;
  return (
    <>
      {
        referenceValues && (
        <ReferenceArrayInput 
          reference={reference}
          source={source}
          perPage={100}
          sort={{ field: sortField?? "id", order: sortOrder?? "ASC" }}>
            <SelectArrayInput fullWidth defaultValue={[]}>
                <ChipField source={source} />
            </SelectArrayInput>
        </ReferenceArrayInput>
        )
      }
    </>
  );
};

export default ReferenceSelectArrayInputItem;
