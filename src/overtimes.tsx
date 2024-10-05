import * as React from "react";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  WrapperField,
} from "react-admin";


const formData = [

  { 
    title: "Overtime",
    inputsList: [
      {
        name: "Employee",
        type: "selectInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: null,
          multiselect: false,
          required: true, 
        },
      },
      {
        name: "Project",
        type: "nestedReferenceInput",
        referenceValues: {
          source: "assignmentId",
          reference: "assignments",
          nestedSource: "projectId",
          nestedReference: "projects",
          required: true, 
        },
      },
      { name: "date", type: "date", required: true },
      { name: "description", type: "string", required: true },
      { name: "hours", type: "number", required: true }
    ],
  },];

export const OvertimeList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="employeeId" reference="employees">
        <WrapperField label="Full Name">
          <TextField source="lastName" /> <TextField source="firstName" />
        </WrapperField>
      </ReferenceField>
      <ReferenceField
        source="assignmentId"
        reference="assignments"
        link={false}
      >
        <ReferenceField
          source="projectId"
          reference="projects"
          label="Project"
        >
          <TextField source="name" />
        </ReferenceField>
      </ReferenceField>
      <DateField source="date" />
      <TextField source="description" />
      <NumberField source="hours" />
    </Datagrid>
  </List>
);

export const OvertimeEdit = () => (
  <EditForm formData={formData} title="Overtime" resource="overtimes" />
);

export const OvertimeCreate = () => (
  <CreateForm formData={formData} title="Overtime" resource="overtimes" />
);
