import * as React from "react"
import { Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';
import { Edit, Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const CompanyList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="tenantId" reference="tenants">
                <TextField source="displayName" />
            </ReferenceField>
            <TextField source="name" />
            <TextField source="address" />
            <TextField source="zipCode" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="country" />
            <DateField source="createdAt" />
            <DateField source="modifiedAt" />
        </Datagrid>
    </List>
);


export const CompanyEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="tenantId" reference="tenants">
                <SelectInput optionText="displayName" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="zipCode" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="country" />
        </SimpleForm>
    </Edit>
);


export const CompanyCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="tenantId" reference="tenants">
                <SelectInput optionText="displayName" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="zipCode" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="country" />
        </SimpleForm>
    </Create>
);