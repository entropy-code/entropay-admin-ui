import * as React from "react";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import {
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  WrapperField,
} from "react-admin";

function disabledCheck(source: string): boolean {
  return source === "employeeProfile";
}

const formData = [
  {
    title: "Overtime",
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
      { name: "date", type: "date", required: true },
      { name: "details", type: "string", required: false },
      { name: "hours", type: "number", required: false },
    ],
  },
];

export const VacationList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="employeeId" reference="employees">
        <WrapperField label="Full Name">
          <TextField source="lastName" /> <TextField source="firstName" />
        </WrapperField>
      </ReferenceField>
      <DateField source="date" />
      <TextField source="details" />
      <NumberField source="hours" />
    </Datagrid>
  </List>
);

export const OvertimeEdit = () => (  
  <EditForm formData={formData} title="Overtime" resource="overtimes" />
);

export const OvertimeCreate = () => (
  <CreateForm formData={formData} title="Overtime" resource="overtimes" />
);
