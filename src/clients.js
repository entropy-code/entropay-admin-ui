import * as React from "react";
import { Datagrid, DateField, EditButton, List, TextField, TextInput, DateInput, Edit, SimpleForm, Create } from 'react-admin';

export const ClientList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="address" />
            <DateField source="zipCode" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="country" />
            <TextField source="contact" />
            <TextField source="preferredCurrency" />
            <TextField source="modifiedAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ClientEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="zipCode" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="country" />
            <TextInput source="contact" />
            <TextInput source="preferredCurrency" />            
        </SimpleForm>
    </Edit>
);

export const ClientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="zipCode" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="country" />
            <TextInput source="contact" />
            <TextInput source="preferredCurrency" />            
        </SimpleForm>
    </Create>
);

