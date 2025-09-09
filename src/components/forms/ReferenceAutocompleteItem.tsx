import * as React from "react";
import { useEffect, useState } from "react";
import { AutocompleteInput, useDataProvider } from "react-admin";

const ReferenceAutocompleteItem = ({
  referenceValues,
}: {
  referenceValues: {
    source: string;
    reference: string;
    optionText: string;
    optionValue: string;
    required?: boolean;
  };
}) => {
  const {
    source,
    reference,
    optionText,
    optionValue,
    required,
  } = referenceValues;

  const dataProvider = useDataProvider();
  const [choices, setChoices] = useState<any[]>([]);

  useEffect(() => {
    dataProvider
      .getList(reference, {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: optionText, order: "ASC" },
        filter: {},
      })
      .then(({ data }) => setChoices(data))
      .catch((error) => {
        console.error("Error fetching", reference, ":", error);
        setChoices([]);
      });
  }, [dataProvider, optionText]);

  return (
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