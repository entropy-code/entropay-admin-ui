import * as React from "react";
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  EditButton,
  useLocaleState,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Basic Information",
    inputsList: [
      { name: "name", type: "string", required: true },
      {
        name: "Tenant",
        type: "selectInput",
        referenceValues: {
          source: "tenantId",
          reference: "tenants",
          optionText: "displayName",
          multiselect: false,
          required: true,
        },
      },
    ],
  },
  {
    title: "Direction",
    inputsList: [
      { name: "address", type: "string" },
      { name: "zipCode", type: "string" },
      { name: "city", type: "string" },
      { name: "state", type: "string" },
      { name: "country", type: "string" },
    ],
  },
];

export const CompanyList = () => {
  const [locale] = useLocaleState();
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="tenantId" reference="tenants">
          <TextField source="displayName" />
        </ReferenceField>
        <TextField source="name" />
        <TextField source="address" />
        <TextField source="zipCode" />
        <TextField source="city" />
        <TextField source="state" />
        <TextField source="country" />
        <DateField source="createdAt" locales={locale} />
        <DateField source="modifiedAt" locales={locale} />
        <EditButton variant="outlined" />
      </Datagrid>
    </List>
  );
};

export const CompanyEdit = () => (
  <EditForm formData={formData} title="Company" resource="companies" />
);

export const CompanyCreate = () => (
  <CreateForm formData={formData} title="Company" resource="companies" />
);
