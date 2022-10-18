import * as React from "react"
import { Datagrid, DateField, EmailField, List, TextField, ReferenceField, EditButton } from 'react-admin';
import CreateEntityLayout from "./components/forms/CreateEntityLayout";
import EditEntityLayout from "./components/forms/EditEntityLayout";

const inputsList = ["internalId", "firstName", "lastName", "email", "phone", "address", "city", "state", "zip", "country"]
const referenceValues = {
    source: 'companyId',
    reference: 'companies',
    optionText: 'name'
}

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
            <EditButton variant="outlined" />
        </Datagrid>
    </List>
);

export const EmployeeEdit = () => (
    <EditEntityLayout inputsList={inputsList} birthDate={true} referenceValues={referenceValues} />
);

export const EmployeeCreate = () => (
    <CreateEntityLayout inputsList={inputsList} birthDate={true} referenceValues={referenceValues} />
);