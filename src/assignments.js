import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
  NumberField,
  WrapperField,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Employee",
    inputsList: [
      {
        name: "Employee",
        type: "selectInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: "lastName",
          multiselect: false,
          required: true,
        },
      },
      { name: "startDate", type: "date", required: true },
      { name: "endDate", type: "date" },
    ],
  },
  {
    title: "Project",
    inputsList: [
      {
        name: "Project",
        type: "selectInput",
        referenceValues: {
          source: "projectId",
          reference: "projects",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
    ],
  },
  {
    title: "Job Position Information",
    inputsList: [
      {
        name: "Role",
        type: "selectInput",
        referenceValues: {
          source: "roleId",
          reference: "roles",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      { name: "hoursPerMonth", type: "number" },
      { name: "billableRate", type: "number" },
      {
        name: "currency",
        type: "selectList",
        choices: [
          { id: "USD", name: "USD - United States dollar" },
          { id: "ARS", name: "ARS - Argentine peso" },
        ],
      },
      { name: "labourHours", type: "string" },
    ],
  },

  {
    title: "Seniority",
    inputsList: [
      {
        name: "Seniority",
        type: "selectInput",
        referenceValues: {
          source: "seniorityId",
          reference: "seniorities",
          optionText: "name",
          multiselect: false,
          required: true
        },
      },
    ],
  },
];

export const AssignmentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="employeeId" reference="employees">
        <WrapperField label="Full Name">
          <TextField source="lastName" /> <TextField source="firstName" />
        </WrapperField>
      </ReferenceField>
      <DateField source="startDate" />
      <DateField source="endDate" />
      <ReferenceField source="roleId" reference="roles">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="hoursPerMonth" />
      <TextField source="billableRate" />
      <ReferenceField source="currency" reference="contracts/currencies">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="labourHours" />
      <ReferenceField source="seniorityId" reference="seniorities">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const AssignmentEdit = () => (
  <EditForm formData={formData} title="Assignment" />
);

export const AssignmentCreate = () => (
  <CreateForm formData={formData} title="Assignment" resource="assignments" />
);
