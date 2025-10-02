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
    title: "Roles",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const RolesList = () => (
  <List exporter={exporter("roles", headers, headersRename)}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const RolesEdit = () => (
  <EditForm formData={formData} title="Roles" resource="roles" />
);

export const RolesCreate = () => (
  <CreateForm formData={formData} title="Roles" resource="roles" />
);
