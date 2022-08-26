import * as React from "react";
import { Datagrid, DateField, EditButton, List, TextField, TextInput, Edit, SimpleForm, Create, ReferenceField, ReferenceInput, SelectInput } from 'react-admin';

export const ClientList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ReferenceField source="companyId" reference="companies">
                <TextField source="name" />
            </ReferenceField>            
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
            <ReferenceInput source="companyId" reference="companies">
                <SelectInput source="name" />
            </ReferenceInput>
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
            <ReferenceInput source="companyId" reference="companies">
                <SelectInput source="name" />
            </ReferenceInput>
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

