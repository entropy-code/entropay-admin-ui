import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  EditButton,
  NumberField,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Seniorities",
    inputsList: [
      { name: "name", type: "string", required: true },
      { name: "vacationDays", type: "number", required: true },
    ],
  },
];

export const SeniorityList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <NumberField source="vacationDays" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SeniorityEdit = () => (
  <EditForm formData={formData} title="Seniority" resource="seniorities" />
);

export const SeniorityCreate = () => (
  <CreateForm formData={formData} title="Seniority" resource="seniorities" />
);
