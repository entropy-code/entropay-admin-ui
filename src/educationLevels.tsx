import * as React from "react";
import { Datagrid, List, TextField, EditButton } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { exporter } from "./utils/exporter";

// Headers for export
const headers = ["id", "name"];
const headersRename = ["ID", "Name"];

const formData = [
  {
    title: "Education Levels",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const EducationLevelsList = () => (
  <List exporter={exporter("education-levels", headers, headersRename)}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const EducationLevelsEdit = () => (
  <EditForm formData={formData} title="Education Levels" resource="education-levels" />
);

export const EducationLevelsCreate = () => (
  <CreateForm formData={formData} title="Education Levels" resource="education-levels" />
);
