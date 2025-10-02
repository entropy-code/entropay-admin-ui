import * as React from "react";
import { Datagrid, List, TextField, EditButton, NumberField } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { exporter } from "./utils/exporter";

// Headers for export
const headers = [
  "id", 
  "name", 
  "description", 
  "maximumAmount", 
  "periodInMonths"
];

const headersRename = [
  "ID", 
  "Name", 
  "Description",
  "Maximum Amount", 
  "Period In Months"
];

const formData = [
  {
    title: "Reimbursement Categories",
    inputsList: [
      { name: "name", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "maximumAmount", type: "number", required: true },
      { name: "periodInMonths", type: "number", required: true },
    ],
  },
];

export const ReimbursementCategoriesList = () => (
  <List exporter={exporter("reimbursement_categories", headers, headersRename)}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="maximumAmount" options={{ style: 'currency', currency: 'USD' }} />
      <NumberField source="periodInMonths" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ReimbursementCategoriesEdit = () => (
  <EditForm formData={formData} title="Reimbursement Categories" resource="reimbursement-categories" />
);

export const ReimbursementCategoriesCreate = () => (
  <CreateForm
    formData={formData}
    title="Reimbursement Categories"
    resource="reimbursement-categories"
  />
);