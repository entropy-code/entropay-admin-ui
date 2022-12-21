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
    title: "Company",
    referenceValues: {
      source: "companyId",
      reference: "companies",
      optionText: "name",
      multiselect: false,
    },
  },
  {
    title: "Employee",
    inputsList: [
      { name: "startDate", type: "date" },
      { name: "endDate", type: "date" },
    ],
    referenceValues: {
      source: "employeeId",
      reference: "companies",
      optionText: "name",
      multiselect: false,
    },
  },
  {
    title: "Position Information",
    inputsList: [
      { name: "hoursPerWeek", type: "number" },
      { name: "costRate", type: "string" },
      { name: "vacations", type: "number" },
    ],
    referenceValues: {
      source: "positionId",
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
      multiselect: true,
    },
  },
];

export const ContractList = () => (
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
      <ReferenceField source="positionId" reference="roles">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="hoursPerWeek" />
      <TextField source="costRate" />
      <NumberField source="vacations" />
      <ReferenceField source="seniorityId" reference="seniorities">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const ContractEdit = () => (
  <EditForm formData={formData} title="Contract" />
);

export const ContractCreate = () => (
  <CreateForm formData={formData} title="Contract" />
);
