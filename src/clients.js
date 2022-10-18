import * as React from "react";
import { Datagrid, DateField, EditButton, List, TextField, ReferenceField } from 'react-admin';
import CreateEntityLayout from "./components/forms/CreateEntityLayout";
import EditEntityLayout from "./components/forms/EditEntityLayout";

const inputsList = ["name", "address", "zipCode", "city", "state", "country", "contact", "preferredCurrency"];
const referenceValues = {
    source: 'companyId',
    reference: 'companies',
    optionText: 'name'
}

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
            <EditButton variant="outlined" />
        </Datagrid>
    </List>
);

export const ClientEdit = () => (
    <EditEntityLayout inputsList={inputsList} referenceValues={referenceValues} />
);

export const ClientCreate = () => (
    <CreateEntityLayout inputsList={inputsList} referenceValues={referenceValues} />
);

