import * as React from "react";
import { useEffect, useState } from "react";
import { AutocompleteInput, AutocompleteArrayInput, useDataProvider, useRecordContext } from "react-admin";

export type Choice = {
  id: number;
  name: string;
};

const ReferenceAutocompleteItem = ({
  referenceValues,
}: {
  referenceValues: {
    source: string;
    reference: string;
    optionText: string | ((choice: any) => string);
    optionValue: string;
    ItemsPerPage: number;
    required?: boolean;
    multiselect?: boolean;
    sortField?: string;
    disabledCheck?: (source: string) => boolean;
  };
}) => {
  const {
    source,
    reference,
    optionText,
    optionValue,
    ItemsPerPage,
    required,
    multiselect,
    sortField,
    disabledCheck,
  } = referenceValues;

  const dataProvider = useDataProvider();
  const record = useRecordContext();
  const [choices, setChoices] = useState<Choice[]>([]);
  const isDisabled =
    disabledCheck !== undefined && record !== undefined
      ? disabledCheck((record as any).source)
      : false;

  useEffect(() => {
    const fieldToSort = sortField ?? (typeof optionText === "string" ? optionText : "id");

    dataProvider
      .getList(reference, {
        pagination: { page: 1, perPage: ItemsPerPage },
        sort: { field: fieldToSort, order: "ASC" },
        filter: {},
      })
      .then(({ data }) => setChoices(data))
      .catch((error) => {
        console.error("Error fetching", reference, ":", error);
        setChoices([]);
      });
  }, [dataProvider, optionText, reference, ItemsPerPage, sortField]);

  return multiselect ? (
    <AutocompleteArrayInput
      source={source}
      choices={choices}
      optionText={optionText}
      optionValue={optionValue}
      isRequired={required}
      disabled={isDisabled}
      fullWidth
      sx={{ gridColumn: "span 2" }}
    />
  ) : (
    <AutocompleteInput
      source={source}
      choices={choices}
      optionText={optionText}
      optionValue={optionValue}
      isRequired={required}
      disabled={isDisabled}
      fullWidth
    />
  );
};

export default ReferenceAutocompleteItem;
