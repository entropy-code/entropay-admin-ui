import * as React from "react";
import { Datagrid, List, TextField, EditButton } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Leave Type",
    inputsList: [{ name: "name", type: "string", required: true }],
  },
];

export const LeaveTypeList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const LeaveTypeEdit = () => (
  <EditForm formData={formData} title="Leave Type" resource="leave-types" />
);

export const LeaveTypeCreate = () => (
  <CreateForm formData={formData} title="Leave Type" resource="leave-types" />
);
