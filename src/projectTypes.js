import * as React from "react";
import { Datagrid, List, TextField, EditButton } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Project Type",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const ProjectTypeList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProjectTypeEdit = () => (
  <EditForm formData={formData} title="Project Type" />
);

export const ProjectTypeCreate = () => (
  <CreateForm
    formData={formData}
    title="Project Type"
    resource="project-types"
  />
);
