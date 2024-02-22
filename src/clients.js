import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  ReferenceField,
  useLocaleState,
  BooleanField,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { HasPermissions } from "./components/layout/CustomActions";

const formData = [
  {
    title: "Personal Information",
    inputsList: [
      { name: "name", type: "string", required: true },
      {
        name: "Company",
        type: "selectInput",
        referenceValues: {
          source: "companyId",
          reference: "companies",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      { name: "internalId", type: "string" },
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
  {
    title: "Contact",
    inputsList: [
      { name: "contactFullName", type: "string" },
      { name: "contactEmail", type: "string" },
    ],
  },
  {
    title: "Others",
    inputsList: [
      { name: "preferredCurrency", type: "string" },
      { name: "active", type: "boolean" }
    ],
  },
];

export const ClientList = () => {
  const [locale] = useLocaleState();
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <ReferenceField source="companyId" reference="companies" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <TextField source="internalId" label="Internal Id" />
        <TextField source="address" />
        <TextField source="zipCode" />
        <TextField source="city" />
        <TextField source="state" />
        <TextField source="country" />
        <TextField source="contactFullName" />
        <TextField source="contactEmail" />
        <TextField source="preferredCurrency" />
        <BooleanField source="active" textAlign="center"/>
        <DateField source="modifiedAt" locales={locale} />
        <DateField source="createdAt" locales={locale} />
        {HasPermissions("clients", "update") && (
          <EditButton/>
        )}
      </Datagrid>
    </List>
  );
};

export const ClientEdit = () => (
  <EditForm formData={formData} title="Client" resource="clients" />
);

export const ClientCreate = () => (
  <CreateForm formData={formData} title="Client" resource="clients" />
);
