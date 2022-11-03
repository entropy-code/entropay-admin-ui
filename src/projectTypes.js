import * as React from "react"
import { Datagrid, List, TextField, EditButton } from 'react-admin';
import EditEntityLayout from "./components/forms/EditEntityLayout";
import CreateEntityLayout from "./components/forms/CreateEntityLayout";

const inputsList = [
    {name: "name"}
];

export const ProjectTypeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProjectTypeEdit = () => (
    <EditEntityLayout inputsList={inputsList} />
);

export const ProjectTypeCreate = () => (
    <CreateEntityLayout inputsList={inputsList} />
);
