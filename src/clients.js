import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  ReferenceField,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Personal Information",
    inputsList: [{ name: "name", type: "string" }],
    referenceValues: {
      source: "companyId",
      reference: "companies",
      optionText: "name",
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
  {
    title: "Contact",
    inputsList: [{ name: "contact", type: "string" }],
  },
  {
    title: "Others",
    inputsList: [{ name: "preferredCurrency", type: "string" }],
  },
  {
    paymentInformation: false,
  },
];

export const ClientList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <ReferenceField source="companyId" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="address" />
      <DateField source="zipCode" />
      <TextField source="city" />
      <TextField source="state" />
      <TextField source="country" />
      <TextField source="contact" />
      <TextField source="preferredCurrency" />
      <TextField source="modifiedAt" />
      <EditButton variant="outlined" />
    </Datagrid>
  </List>
);

export const ClientEdit = () => <EditForm formData={formData} title="Client" />;

export const ClientCreate = () => (
  <CreateForm formData={formData} title="Client" />
);
