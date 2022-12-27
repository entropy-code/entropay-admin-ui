import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
  NumberField,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Employee",
    inputsList: [
      { name: "startDate", type: "date" },
      { name: "endDate", type: "date" },
    ],
    referenceValues: {
      source: "employeeId",
      reference: "employees",
      optionText: "lastName",
      multiselect: false,
    },
  },
  {
    title: "Project",
    referenceValues: {
      source: "projectId",
      reference: "projects",
      optionText: "name",
      multiselect: false,
    },
  },
  {
    title: "Job Position Information",
    inputsList: [
      { name: "hoursPerWeek", type: "number" },
      { name: "billableRate", type: "number" },
    ],
    referenceValues: {
      source: "roleId",
      reference: "roles",
      optionText: "name",
      multiselect: false,
    },
  },
  {
    title: "Seniority",
    referenceValues: {
      source: "seniorityId",
      reference: "seniorities",
      optionText: "name",
      multiselect: false,
    },
  },
];

export const AssignmentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="companyId" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        source="employeeId"
        reference="employees"
        label="Employee FN"
      >
        <TextField source="firstName" label="First Name" />
      </ReferenceField>
      <ReferenceField
        source="employeeId"
        reference="employees"
        label="Employee LN"
      >
        <TextField source="lastName" />
      </ReferenceField>
      <DateField source="startDate" />
      <DateField source="endDate" />
      <ReferenceField source="roleId" reference="roles">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="hoursPerWeek" />
      <TextField source="billableRate" />
      <NumberField source="vacations" />
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
  <CreateForm formData={formData} title="Assignment" />
);
