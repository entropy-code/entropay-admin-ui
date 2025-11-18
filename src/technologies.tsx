import * as React from "react";
import { Datagrid, List, TextField, EditButton, ReferenceField } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { exporter } from "./utils/exporter";

// Headers for export
const headers = ["id", "name"];
const headersRename = ["ID", "Name"];

const formData = [
  {
    title: "Technologies",
    inputsList: [
      {
        name: "ContractType",
        type: "selectInput",
        referenceValues: {
          source: "technologyType",
          reference: "technologies/types",
          optionText: "value",
          multiselect: false,
          required: true,
          sortField: "value"
        },
      },
      { name: "name", type: "string", required: true },
    ],
  },
];

export const TechnologiesList = () => (
  <List exporter={exporter("technologies", headers, headersRename)}>
    <Datagrid rowClick="edit">
      <ReferenceField source="technologyType" reference="technologies/types" link={false}>
        <TextField source="value" />
      </ReferenceField>
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const TechnologiesEdit = () => (
  <EditForm formData={formData} title="Technologies" resource="technologies" />
);

export const TechnologiesCreate = () => (
  <CreateForm
    formData={formData}
    title="Technologies"
    resource="technologies"
  />
);
