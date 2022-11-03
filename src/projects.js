import * as React from "react"
import { Datagrid, DateField, EditButton, List, ReferenceField, TextField, Edit, Create } from 'react-admin';
import ProjectFormLayout from "./components/forms/ProjectFormLayout";

const inputsList = [
    {name: "name", type: "string"},
    {name: "startDate", type: "date"},
    {name: "endDate", type: "date"},
    {name: "notes", type: "string"},
  ];

const clientReferences = {
    source: 'clientId',
    reference: 'clients',
    optionText: 'name'
}

const projectReferences = {
    source: 'projectTypeId',
    reference: 'project-types',
    optionText: 'name'
}

export const ProjectList = () => (
    <List>
        <Datagrid rowClick="edit">
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
        <ProjectFormLayout inputsList={inputsList} clientReferences={clientReferences} projectReferences={projectReferences} />
    </Edit>
);

export const ProjectCreate = () => (
    <Create>
        <ProjectFormLayout inputsList={inputsList} clientReferences={clientReferences} projectReferences={projectReferences} />
    </Create>
);
