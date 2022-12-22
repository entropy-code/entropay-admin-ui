import * as React from "react";
import { Datagrid, List, TextField, EditButton } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Seniorities",
    inputsList: [{ name: "name", type: "string" }],
  },
];

export const SeniorityList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SeniorityEdit = () => (
  <EditForm formData={formData} title="Seniority" />
);

export const SeniorityCreate = () => (
  <CreateForm formData={formData} title="Seniority" />
);
