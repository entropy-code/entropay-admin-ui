import * as React from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
  useLocaleState,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Client",
    inputsList: [
      {
        name: "Client",
        type: "selectInput",
        referenceValues: {
          source: "clientId",
          reference: "clients",
          optionText: "name",
          required: true,
        },
      },
    ],
  },
  {
    title: "Project",
    inputsList: [
      {
        name: "Project",
        type: "selectInput",
        referenceValues: {
          source: "projectTypeId",
          reference: "project-types",
          optionText: "name",
        },
      },
      {
        name: "paidPto",
        type: "boolean",
        defaultValue: false,
        label: "Paid PTO",
      },
    ],
  },
  {
    title: "Extra Information",
    inputsList: [
      { name: "name", type: "string", required: true },
      { name: "startDate", type: "date" },
      { name: "endDate", type: "date" },
      { name: "notes", type: "string" },
    ],
  },
];

export const ProjectList = () => {
  const [locale] = useLocaleState();
  return (
    <List>
      <Datagrid rowClick="edit">
        <ReferenceField source="clientId" reference="clients">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="projectTypeId" reference="project-types">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <BooleanField source="paidPto" label="Paid PTO" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const ProjectEdit = () => (
  <EditForm formData={formData} title="Projects" resource="projects" />
);

export const ProjectCreate = () => (
  <CreateForm formData={formData} title="Projects" resource="projects" />
);
