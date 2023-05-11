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
  useGetList,
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




const holidayFilters = (data) => [
  <SelectInput
    source="q"
    label="Countries"    
    choices={data}
    alwaysOn
    style={{ marginTop: "20px", marginBottom: "20px" }}
  />,
  <SelectInput
    source="year"
    choices={[
      { id: "2022", name: "2022" },
      { id: "2023", name: "2023" },
      { id: "2024", name: "2024" },
    ]}
    alwaysOn
    style={{ marginTop: "20px", marginBottom: "20px" }}
  />,
];

export const HolidayList = () => {
  const [locale] = useLocaleState();
  const { data } = useGetList("countries");
  return (
    <div style={{ margin: "20px" }}>
      <List filters={holidayFilters(data)}>
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
