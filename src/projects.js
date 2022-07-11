import * as React from "react"
import {
    Datagrid,
    DateField,
    EditButton,
    List,
    ReferenceField,
    TextField,
    DateInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Create
} from 'react-admin';

export const ProjectList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="clientId" reference="clients">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="projectTypeId" reference="project-types">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="name" />
            <DateField source="startDate" />
            <DateField source="endDate" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProjectEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="clientId" reference="clients">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceField source="projectTypeId" reference="project-types">
                <TextField source="name" />
            </ReferenceField>
            <TextInput source="name" />
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <TextInput source="notes" />
        </SimpleForm>
    </Edit>
);

export const ProjectCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="clientId" reference="clients">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="projectTypeId" reference="project-types">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" />
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <TextInput source="notes" />
        </SimpleForm>
    </Create>
);