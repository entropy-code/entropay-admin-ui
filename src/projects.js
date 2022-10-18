import * as React from "react"
import { Datagrid, DateField, EditButton, List, ReferenceField, TextField, Edit, Create } from 'react-admin';
import ProjectFormLayout from "./components/forms/ProjectFormLayout";

const referenceValuesC = {
    source: 'clientId',
    reference: 'clients',
    optionText: 'name'
}

const referenceValuesP = {
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
        <ProjectFormLayout referenceValuesC={referenceValuesC} referenceValuesP={referenceValuesP} />
    </Edit>
);

export const ProjectCreate = () => (
    <Create>
        <ProjectFormLayout referenceValuesC={referenceValuesC} referenceValuesP={referenceValuesP} />
    </Create>
);