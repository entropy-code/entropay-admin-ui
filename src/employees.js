import * as React from "react"
import { Datagrid, DateField, EmailField, List, TextField, EditButton } from 'react-admin';
import CreateEntityLayout from "./components/forms/CreateEntityLayout";
import EditEntityLayout from "./components/forms/EditEntityLayout";

const inputsList = [
    {name: "firstName", type: "string"},
    {name: "lastName", type: "string"},
    {name: "internalId", type: "string"},
    {name: "personalEmail", type: "string"},
    {name: "phone", type: "string"},
    {name: "birthDate", type: "date"},
    {name: "taxId", type: "string"},
    {name: "personalNumber", type: "string"},
    {name: "address", type: "string"},
    {name: "state", type: "string"},
    {name: "zip", type: "string"},
    {name: "country", type: "string"},
    {name: "city", type: "string"},
    {name: "emergencyContactFullName", type: "string"},
    {name: "emergencyContactPhone", type: "string"}
]
const referenceValues = {
    source: 'profile',
    reference: 'roles',
    optionText: 'name'
}

export const EmployeeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="internalId" label="Internal Id"/>
            <TextField source="firstName" />
            <TextField source="lastName" />  
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
            <EditButton variant="outlined" />
        </Datagrid>
    </List>
);

export const EmployeeEdit = () => (
    <EditEntityLayout inputsList={inputsList} referenceValues={referenceValues} select={false} />
);

export const EmployeeCreate = () => (
    <CreateEntityLayout inputsList={inputsList} referenceValues={referenceValues} select={false} />
);
