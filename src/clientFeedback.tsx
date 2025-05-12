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
    title: "Client Feedback",
    inputsList: [
      {
        name: "Client",
        type: "selectInput",
        referenceValues: {
          source: "clientId",
          reference: "clients",
          optionText: "name",
          multiselect: false,
          required: true,
          sortField: "name",
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

export const ClientFeedbackList = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField source="clientId" reference="clients">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="feedbackDate" />
        <TextField source="title" />
        <SelectField source="source" choices={feedbackSourceChoices} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const ClientFeedbackEdit = () => (
  <EditForm formData={formData} title="Client Feedback" resource="feedback/client" />
);

export const ClientFeedbackCreate = () => (
  <CreateForm formData={formData} title="Client Feedback" resource="feedback/client" />
);