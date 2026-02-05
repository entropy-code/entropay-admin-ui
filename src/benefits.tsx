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
    title: "Benefits",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const BenefitsList = () => (
  <List exporter={exporter("benefits", headers, headersRename)}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const BenefitsEdit = () => (
  <EditForm formData={formData} title="Benefits" resource="benefits" />
);

export const BenefitsCreate = () => (
  <CreateForm formData={formData} title="Benefits" resource="benefits" />
);
