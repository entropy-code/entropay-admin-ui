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
      reference: "employees",
      optionText: "lastName",
      multiselect: false,
    },
  },
  {
    title: "Job Position Information",
    inputsList: [
      { name: "hoursPerMonth", type: "number" },
      { name: "monthlySalary", type: "string" },
      { name: "costRate", type: "string" },
      { name: "currency", type: "selectList", choices: [
        { id: 'USD', name: 'USD - United States dollar' },
        { id: 'ARS', name: 'ARS - Argentine peso' },
      ]},
      { name: "vacations", type: "number" },
      { name: "benefits", type: "string" },
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
{
  title: "ContractType",
    referenceValues: {
    source: "contractType",
      reference: "contracts/contract-types",
        optionText: "value",
          multiselect: false,

      },
},
{
  customSections: ["notesSection"],
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
      >
        <WrapperField label="Full Name">
          <TextField source="lastName" />
          {' '}
          <TextField source="firstName" />
        </WrapperField>
      </ReferenceField>
      <DateField source="startDate" />
      <DateField source="endDate" />
      <ReferenceField source="contractType" reference="contracts/contract-types">
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField source="roleId" reference="roles">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="hoursPerMonth" />
      <TextField source="costRate" />
      <TextField source="monthlySalary" />
      <ReferenceField source="currency" reference="contracts/currencies">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="vacations" />
      <ReferenceField source="seniorityId" reference="seniorities">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="benefits" />
      <TextField source="notes" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ContractEdit = () => (
  <EditForm formData={formData} title="Contract" />
);

export const ContractCreate = () => (
  <CreateForm formData={formData} title="Contract" resource="contracts" />
);
