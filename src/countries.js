import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  EditButton,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
    {
      title: "Country",
      inputsList: [
        { name: "name", type: "string", required: true },
      ],
    },
  ];

  export const CountryList = () => (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <EditButton />
      </Datagrid>
    </List>
  );
  
  export const CountryEdit = () => (
    <EditForm formData={formData} title="Country" />
  );
  
  export const CountryCreate = () => (
    <CreateForm
      formData={formData}
      title="Country"
      resource="countries"
    />
  );
