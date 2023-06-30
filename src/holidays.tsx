import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  EditButton,
  DateField,
  useLocaleState,
  SelectInput,
  ReferenceField,
  ReferenceInput,
  useGetList,
  Filter,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { ICountry } from "./types/country";
import { IYear } from "./types/year";

const formData = [
  {
    title: "Holiday",
    inputsList: [
      { name: "date", type: "date", required: true },
      { name: "description", type: "string", required: true },
      {
        name: "Country",
        type: "selectInput",
        referenceValues: {
          source: "countryId",
          reference: "countries",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
    ],
  },
];

const GetDefaultCountryId = (): string | null => {
  const { data: countries } = useGetList<ICountry>("countries");
  const defaultCountry = countries?.find(
    (country: ICountry) => country.name === "Argentina"
  );
  return defaultCountry?.id || null;
}; // TODO: get current country from locale

const YearOptions = (): IYear[] => {
  const currentYear = new Date().getFullYear();
  const years: IYear[] = [];
  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    years.push({ id: year.toString(), name: year.toString() });
  }
  return years;
}; // TODO: implement new endpoint with list or year with created holidays

const HolidayFilters = () => (
  <Filter>
    <ReferenceInput source="countryId" reference="countries" alwaysOn>
      <SelectInput
        source="countryId"
        emptyText="All countries"
        optionText="name"
        optionValue="id"
        label="Countries"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </ReferenceInput>
    <SelectInput
      source="year"
      label="Year"
      emptyText="All years"
      choices={YearOptions()} // get years options
      alwaysOn
      style={{ marginTop: "20px", marginBottom: "20px" }}
    />
  </Filter>
);

export const HolidayList = () => {
  const [locale] = useLocaleState();
  const defaultCountryId: string | null = GetDefaultCountryId();
  const currentYear: number = new Date().getFullYear();
  if (!defaultCountryId || !currentYear) {
    return <></>;
  }
  return (
    <div style={{ margin: "20px" }}>
      <List
        filters={HolidayFilters()}
        filterDefaultValues={{ countryId: defaultCountryId, year: currentYear }}
        perPage={50}
      >
        <Datagrid rowClick="edit">
          <DateField source="date" locales={locale} />
          <TextField source="description" />
          <ReferenceField source="countryId" reference="countries">
            <TextField source="name" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      </List>
    </div>
  );
};

export const HolidayEdit = () => (
  <EditForm formData={formData} title="Holiday" resource="holidays"/>
);

export const HolidayCreate = () => (
  <CreateForm formData={formData} title="Holiday" resource="holidays" />
);
