import * as React from "react";
import { Datagrid, List, TextField, EditButton } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Technologies",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const TechnologiesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const TechnologiesEdit = () => (
  <EditForm formData={formData} title="Technologies" resource="technologies" />
);

export const TechnologiesCreate = () => (
  <CreateForm
    formData={formData}
    title="Technologies"
    resource="technologies"
  />
);
