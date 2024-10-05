import * as React from "react";
import { ReferenceInput, SelectInput, useGetMany, useGetManyReference, useRecordContext } from "react-admin";

const NestedReferenceInput = ({
  referenceValues,
}: {
  referenceValues: {
    source: string;
    reference: string;
    optionText: string;
    required?: boolean;
    isDisabled?: boolean;
    sortField?: string;
    sortOrder?: "ASC" | "DESC";
    nestedReference: string;
    nestedSource: string;
  };
}) => {
  const {
    source,
    reference,
    optionText,
    required,
    sortField,
    sortOrder,
    isDisabled,
    nestedReference,
    nestedSource
  } = referenceValues;
  const record = useRecordContext();

  const { data: referenceEntity } = useGetManyReference(
    reference,
    { 
      target: 'employeeId',
      id: record?.employeeId,
    },
  );

  const nestedEntityIds = referenceEntity?.map(referenceEntity => referenceEntity.projectId) || [];

  const { data: nestedEntities } = useGetMany(
    nestedReference,
    { ids: nestedEntityIds },
    {
      enabled: nestedEntityIds.length > 0, 
    }
  );

  const choices = referenceEntity?.map(re => {
    const project = nestedEntities?.find(ne => ne.id === re[nestedSource]);
    return {
      id: re.id,
      name: project?.name || 'Unknown',
    };
  }) || [];

  return (
    <>
      {referenceValues && (
        <ReferenceInput
          source={source}
          reference={reference}
          perPage={100}
          sort={{ field: sortField ?? "id", order: sortOrder ?? "ASC" }}
        >
          <SelectInput
            optionText={optionText}
            required={required}
            readOnly={isDisabled}
            source={source}
            choices={choices}
            fullWidth
          />
        </ReferenceInput>
      )}
    </>
  );
};

export default NestedReferenceInput;