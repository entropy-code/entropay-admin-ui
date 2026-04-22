import * as React from "react";
import { useEffect, useState } from "react";
import { AutocompleteInput, AutocompleteArrayInput, useDataProvider } from "react-admin";

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
    optionText: string;
    optionValue: string;
    ItemsPerPage: number;
    required?: boolean;
    multiselect?: boolean;
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
  } = referenceValues;

  const dataProvider = useDataProvider();
  const [choices, setChoices] = useState<Choice[]>([]);

  useEffect(() => {
    dataProvider
      .getList(reference, {
        pagination: { page: 1, perPage: ItemsPerPage },
        sort: { field: optionText, order: "ASC" },
        filter: {},
      })
      .then(({ data }) => setChoices(data))
      .catch((error) => {
        console.error("Error fetching", reference, ":", error);
        setChoices([]);
      });
  }, [dataProvider, optionText, reference, ItemsPerPage]);

  return multiselect ? (
    <AutocompleteArrayInput
      source={source}
      choices={choices}
      optionText={optionText}
      optionValue={optionValue}
      isRequired={required}
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
      fullWidth
    />
  );
};

export default ReferenceAutocompleteItem;
