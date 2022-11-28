import * as React from "react"
import { Datagrid, DateField, EditButton, List, ReferenceField, TextField, DateInput, Edit, ReferenceInput, SelectInput, SimpleForm, NumberField, NumberInput,
TextInput, Create, FunctionField } from 'react-admin';

export const AssignmentList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="projectId" reference="projects">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="employeeId" reference="employees" label="Employee">
                <FunctionField render={record => `${record.firstName} ${record.lastName} (${record.internalId})`} />
            </ReferenceField>
            <DateField source="startDate" />
            <DateField source="endDate" />
            <ReferenceField source="roleId" reference="roles">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="hoursPerWeek" />
            <TextField source="billableRate" />
            <ReferenceField source="seniorityId" reference="seniorities">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const AssignmentEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="projectId" reference="projects">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="employeeId" reference="employees">
                <SelectInput optionText={record => `${record.firstName} ${record.lastName} (${record.internalId})`} />
            </ReferenceInput>
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <ReferenceInput source="roleId" reference="roles">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="hoursPerWeek" />
            <TextInput source="billableRate" />
            <ReferenceInput source="seniorityId" reference="seniorities">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const AssignmentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="projectId" reference="projects">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="employeeId" reference="employees">
                <SelectInput optionText={record => `${record.firstName} ${record.lastName} (${record.internalId})`} />
            </ReferenceInput>
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <ReferenceInput source="roleId" reference="roles">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="hoursPerWeek" />
            <TextInput source="billableRate" />
            <ReferenceInput source="seniorityId" reference="seniorities">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
