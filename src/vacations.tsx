import * as React from "react";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  TextField,
  WrapperField,
} from "react-admin";
import { exporter } from "./utils/exporter";

// Headers for export
const headers = [
  "id", 
  "employeeId", 
  "year", 
  "credit", 
  "debit"
];
const headersRename = [
  "ID", 
  "Employee", 
  "Year", 
  "Credit", 
  "Debit"
];

function disabledCheck(source: string): boolean {
  return source === "employeeProfile";
}

const formData = [
  {
    title: "Vacations",
    inputsList: [
      {
        name: "Employee",
        type: "selectInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: null,
          multiselect: false,
          required: true,
          disabledCheck: disabledCheck,
        },
      },
      { name: "year", type: "string", required: true },
      { name: "credit", type: "number", required: false },
    ],
  },
];

export const VacationList = () => (
  <List exporter={exporter("vacations", headers, headersRename)}>
    <Datagrid rowClick="edit">
      <ReferenceField source="employeeId" reference="employees">
        <WrapperField label="Full Name">
          <TextField source="lastName" /> <TextField source="firstName" />
        </WrapperField>
      </ReferenceField>
      <TextField source="year" />
      <TextField source="credit" />
      <TextField source="debit" />
      <FunctionField
        label="Edit"
        render={(record: { credit: number }) => record.credit > 0 && <EditButton />}
      />
    </Datagrid>
  </List>
);

export const VacationEdit = () => (  
  <EditForm formData={formData} title="Vacation" resource="vacations" />
);

export const VacationCreate = () => (
  <CreateForm formData={formData} title="Vacation" resource="vacations" />
);
