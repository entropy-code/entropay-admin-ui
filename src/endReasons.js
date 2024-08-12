import * as React from "react";
import { Datagrid, List, TextField, EditButton } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "End Reasons",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const EndReasonsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const EndReasonsEdit = () => (
  <EditForm formData={formData} title="End Reasons" resource="end-reasons" />
);

export const EndReasonsCreate = () => (
  <CreateForm formData={formData} title="End Reasons" resource="end-reasons" />
);