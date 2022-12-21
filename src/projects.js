import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Client",
    referenceValues: {
      source: "clientId",
      reference: "clients",
      optionText: "name",
    },
  },
  {
    title: "Project",
    referenceValues: {
      source: "projectTypeId",
      reference: "project-types",
      optionText: "name",
    },
  },
  {
    title: "Extra Information",
    inputsList: [
      { name: "name", type: "string" },
      { name: "startDate", type: "date" },
      { name: "endDate", type: "date" },
      { name: "notes", type: "string" },
    ],
  },
  {
    paymentInformation: false,
  },
];

export const ProjectList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="clientId" reference="clients">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="projectTypeId" reference="project-types">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <DateField source="startDate" />
      <DateField source="endDate" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProjectEdit = () => (
  <EditForm formData={formData} title="Projects" />
);

export const ProjectCreate = () => (
  <CreateForm formData={formData} title="Projects" />
);
