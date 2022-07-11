import * as React from "react"
import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create, EditButton } from 'react-admin';

export const ProjectTypeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProjectTypeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const ProjectTypeCreate = () => (
    <Create>
        <SimpleForm>            
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);