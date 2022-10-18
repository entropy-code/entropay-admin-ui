import * as React from "react"
import { Datagrid, DateField, List, ReferenceField, TextField, EditButton } from 'react-admin';
import CreateEntityLayout from "./components/forms/CreateEntityLayout";
import EditEntityLayout from "./components/forms/EditEntityLayout";

const inputsList = ["name", "address", "zipCode", "city", "state", "country"];
const referenceValues = {
    source: 'tenantId',
    reference: 'tenants',
    optionText: 'displayName'
}

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
            <EditButton variant="outlined" />
        </Datagrid>
    </List>
);


export const CompanyEdit = () => (
    <EditEntityLayout inputsList={inputsList} referenceValues={referenceValues} />
);


export const CompanyCreate = () => (
    <CreateEntityLayout inputsList={inputsList} referenceValues={referenceValues} />
);