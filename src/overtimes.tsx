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



function disabledCheck(source: string): boolean {
 
  return source === "employeeProfile";
}

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
        name: "Assignment",
        type: "selectInput",
        referenceValues: {
          source: "assignmentId",
          reference: "assignments",
          optionText: null,
          multiselect: false,
          required: true, 
        },
      },
      { name: "date", type: "date", required: true },
      { name: "description", type: "string", required: true },
      { name: "hours", type: "number", required: true },

     {
      name: "projectName", 
      type: "customProjectNameDisplay",  // Tipo personalizado para mostrar el nombre del proyecto
      label: "Project Name"

     },  
      

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
        label="Project"
        link={false}
      >
        <ReferenceField
          source="projectId"
          reference="projects"
          link={false}
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



