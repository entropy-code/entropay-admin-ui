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
  useDataProvider,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { ICountry } from "./types/country";
import { IYear } from "./types/year";
import { exporter } from "./utils/exporter";

// Headers for export with related data
const headers = [
  "id", 
  "date", 
  "description", 
  "country.name",
  "deleted",
  "createdAt",
  "modifiedAt"
];
const headersRename = [
  "ID", 
  "Date", 
  "Description", 
  "Country", 
  "Deleted", 
  "Created At", 
  "Modified At"
];

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
    (country: ICountry) => country.name === "Argentina",
  );
  return defaultCountry?.id || null;
}; // TODO: get current country from current user

const YearOptions = () => {
  const { data: years } = useGetList<IYear>("holidays/years");
  return years?.map((year) => ({ id: year.id, name: year.year })) || [];
};

export const HolidayList = () => {
  const [locale] = useLocaleState();
  const defaultCountryId: string | null = GetDefaultCountryId();
  const currentYear: number = new Date().getFullYear();
  const yearsByFilter = YearOptions();
  const dataProvider = useDataProvider();

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
        choices={yearsByFilter}
        alwaysOn
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </Filter>
  );

  return (
    <div style={{ margin: "20px" }}>
      <List
        exporter={exporter("holidays", headers, headersRename, dataProvider, true)}
        filters={HolidayFilters()}
        filterDefaultValues={{ countryId: defaultCountryId, year: currentYear }}
        perPage={50}
      >
        <Datagrid rowClick="edit">
          <DateField source="date"
                     options={{
                       day: "2-digit",
                       month: "long",
                       year: "numeric",
                     }}
          />
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
  <EditForm formData={formData} title="Holiday" resource="holidays" />
);

export const HolidayCreate = () => (
  <CreateForm formData={formData} title="Holiday" resource="holidays" />
);
