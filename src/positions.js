import * as React from "react"
import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create, EditButton } from 'react-admin';

export const PositionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PositionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const PositionCreate = () => (
    <Create>
        <SimpleForm>            
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);