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
import { exporter } from "./utils/exporter";

// Headers for export
const headers = [
  "id",
  "clientId",
  "name",
  "projectTypeId",
  "startDate",
  "endDate",
  "notes",
  "paidPto",
  "isInternal",
  "deleted",
  "createdAt",
  "modifiedAt",
];
const headersRename = [
  "ID",
  "Client Id",
  "Name",
  "Project Type Id",
  "Start Date",
  "End Date",
  "Notes",
  "Paid PTO",
  "Is Internal",
  "Deleted",
  "Created At",
  "Modified At",
];

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
      {
        name: "isInternal",
        type: "boolean",
        defaultValue: false,
        label: "Internal",
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
    <List exporter={exporter("projects", headers, headersRename,undefined,true)}>
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
        <BooleanField source="isInternal" label="Internal" />
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
