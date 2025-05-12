import * as React from "react";
import { Datagrid, EditButton, List, ReferenceField, SelectField, TextField } from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

// Define the feedback source choices
export const feedbackSourceChoices = [
  { id: "EXIT_INTERVIEW", name: "Exit Interview" },
  { id: "LEADER", name: "Leader" },
  { id: "ONE_ON_ONE", name: "1:1 Meeting" },
  { id: "OTHER", name: "Other" },
  { id: "PEER", name: "Peer" },
];


const formData = [
  {
    title: "Employee Feedback",
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
          sortField: "firstName",
          filter: { active: true },
        },
      },
      { name: "title", type: "string", required: true },
      { name: "feedbackDate", type: "date", required: true },
      {
        name: "source",
        type: "selectList",
        required: true,
        choices: feedbackSourceChoices,
      },
      { name: "text", type: "richString", required: true },
    ],
  },
];

export const EmployeeFeedbackList = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField source="employeeId" reference="employees">
          <TextField source="lastName" /> <TextField source="firstName" />
        </ReferenceField>
        <TextField source="feedbackDate" />
        <TextField source="title" />
        <SelectField source="source" choices={feedbackSourceChoices} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const EmployeeFeedbackEdit = () => (
  <EditForm formData={formData} title="Employee Feedback" resource="feedback/employee" />
);

export const EmployeeFeedbackCreate = () => (
  <CreateForm formData={formData} title="Employee Feedback" resource="feedback/employee" />
);