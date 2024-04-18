import * as React from "react";
import { ChipField, ReferenceArrayInput, SelectArrayInput} from "react-admin";

const ReferenceSelectArrayInputItem = ({ referenceValues }) => {
  const { source, reference} = referenceValues;
  return (
    <>
      {
        referenceValues && (
        <ReferenceArrayInput 
          reference={reference}
          source={source}
          perPage={100}>
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
