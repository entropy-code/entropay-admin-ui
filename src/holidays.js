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

const YearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    years.push({ id: year.toString(), name: year.toString() });
  }
  return years;
};

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

const GetDefaultCountryId = () => {
  const { data: countries } = useGetList("countries");
  const defaultCountry = countries?.find((country) => country.name === "Argentina");
  return defaultCountry?.id || null;
};

export const HolidayList = () => {
  const [locale] = useLocaleState();
  const defaultCountryId = GetDefaultCountryId();
  localStorage.removeItem("RaStore.holidays.listParams");
  return (
    <div style={{ margin: "20px" }} >
      <List filters={HolidayFilters()} filterDefaultValues={{countryId: defaultCountryId ,year: "2023"}} perPage={50}>
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
  <EditForm formData={formData} title="Holiday" />
);

export const HolidayCreate = () => (
  <CreateForm formData={formData} title="Holiday" resource="holidays" />
);
