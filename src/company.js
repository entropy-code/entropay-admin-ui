import * as React from "react";
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  EditButton,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/CreateForm";

const formData = [
  {
    title: "Basic Information",
    inputsList: [{ name: "name", type: "string" }],
    referenceValues: {
      source: "tenantId",
      reference: "tenants",
      optionText: "displayName",
      multiselect: false,
    },
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

export const CompanyList = () => (
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
      <DateField source="createdAt" />
      <DateField source="modifiedAt" />
      <EditButton variant="outlined" />
    </Datagrid>
  </List>
);

export const CompanyEdit = () => (
  <EditForm formData={formData} title="Company" />
);

export const CompanyCreate = () => (
  <CreateForm formData={formData} title="Company" resource="companies" />
);
