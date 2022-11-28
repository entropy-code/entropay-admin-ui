import * as React from "react"
import { Datagrid, DateField, EditButton, List, ReferenceField, TextField, DateInput, Edit, ReferenceInput, SelectInput, SimpleForm, NumberField, NumberInput,
TextInput, Create } from 'react-admin';

export const ContractList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="companyId" reference="companies">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="employeeId" reference="employees" label="Employee FN">
                <TextField source="firstName" label="First Name"/>
            </ReferenceField>
            <ReferenceField source="employeeId" reference="employees" label="Employee LN" >
                <TextField source="lastName" />
            </ReferenceField>
            <DateField source="startDate" />
            <DateField source="endDate" />
            <ReferenceField source="positionId" reference="roles">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="hoursPerWeek" />
            <TextField source="costRate" />
            <NumberField source="vacations" />
            <ReferenceField source="seniorityId" reference="seniorities">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const ContractEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="companyId" reference="companies">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="employeeId" reference="employees">
                <SelectInput optionText="lastName" />
            </ReferenceInput>
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <ReferenceInput source="positionId" reference="roles">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="hoursPerWeek" />
            <TextInput source="costRate" />
            <NumberInput source="vacations" />
            <ReferenceInput source="seniorityId" reference="seniorities">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const ContractCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="companyId" reference="companies">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="employeeId" reference="employees">
                <SelectInput optionText="lastName" />
            </ReferenceInput>
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <ReferenceInput source="positionId" reference="roles">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="hoursPerWeek" />
            <TextInput source="costRate" />
            <NumberInput source="vacations" />
            <ReferenceInput source="seniorityId" reference="seniorities">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
