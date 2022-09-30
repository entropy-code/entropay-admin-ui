import * as React from "react"
import { Datagrid, DateField, EmailField, List, TextField, ReferenceField } from 'react-admin';
import { DateInput, Edit, SimpleForm, TextInput, Create, SelectInput, ReferenceInput } from 'react-admin';

export const EmployeeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="internalId" label="Internal Id"/>
            <TextField source="firstName" />
            <TextField source="lastName" />            
            <ReferenceField source="companyId" reference="companies">
                <TextField source="name" />
            </ReferenceField>
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zip" />
            <TextField source="country" />
            <DateField source="birthDate" />
            <DateField source="createdAt" />
            <DateField source="modifiedAt" />
        </Datagrid>
    </List>
);

export const EmployeeEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="companyId" reference="companies">
                <SelectInput source="name" />
            </ReferenceInput>
            <TextInput disabled source="id" />
            <TextInput source="internalId" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zip" />
            <TextInput source="country" />
            <DateInput source="birthDate" />
        </SimpleForm>
    </Edit>
);

export const EmployeeCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="companyId" reference="companies">
                <SelectInput source="name" />
            </ReferenceInput>
            <TextInput source="internalId" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zip" />
            <TextInput source="country" />
            <DateInput source="birthDate" />
        </SimpleForm>
    </Create>
);