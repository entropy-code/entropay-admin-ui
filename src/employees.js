import * as React from "react"
import { Datagrid, DateField, EmailField, List, TextField} from 'react-admin';
import { DateInput, Edit, SimpleForm, TextInput, Create, SelectArrayInput, ChipField, ReferenceArrayInput } from 'react-admin';

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
        </Datagrid>
    </List>
);

export const EmployeeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="internalId" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="personalNumber" />
            <TextInput source="taxId" />
            <TextInput source="personalEmail" />
            <TextInput source="phone" />
            <TextInput source="address" />            
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zip" />
            <TextInput source="country" />
            <DateInput source="birthDate" />
            <TextInput source="emergencyContactFullName" />
            <TextInput source="emergencyContactPhone" />
            <ReferenceArrayInput reference="roles" source="profile">
                <SelectArrayInput>
                    <ChipField source="profile" />
                </SelectArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const EmployeeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="internalId" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="personalNumber" />
            <TextInput source="taxId" />
            <TextInput source="personalEmail" />
            <TextInput source="phone" />
            <TextInput source="address" />            
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zip" />
            <TextInput source="country" />
            <DateInput source="birthDate" />
            <TextInput source="emergencyContactFullName" />
            <TextInput source="emergencyContactPhone" />
            <ReferenceArrayInput reference="roles" source="profile">
                <SelectArrayInput>
                     <ChipField source="profiles" />
                </SelectArrayInput>     
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
