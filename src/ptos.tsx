import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  DeleteButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
  WrapperField
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Employee",
    inputsList: [
      {
        name: "Employee",
        type: "selectInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: null,
          multiselect: false,
          required: true
        }
      }
    ]
  },
  {
    title: "LeaveType",
    inputsList: [
      {
        name: "Leave Type",
        type: "selectInput",
        referenceValues: {
          source: "leaveTypeId",
          reference: "leave-types",
          optionText: "name",
          multiselect: false,
          required: true
        }
      },
      {},
      { name: "ptoStartDate", type: "date", required: true },
      { name: "ptoEndDate", type: "date", required: true },
      { name: "setHours", type: "boolean"}, 
      {},
      { name: "labourHours", type: "conditionNumberField", conditionField: "setHours"}
    ]
  },
  {
    title: "Details",
    inputsList: [      
      { name: "details", type: "string" }
    ],
  },
];


export const PtoList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="employeeId" reference="employees">
        <WrapperField label="Full Name">
          <TextField source="firstName" /> <TextField source="lastName" />
        </WrapperField>
      </ReferenceField>
      <ReferenceField source="leaveTypeId" reference="leave-types">
        <WrapperField label="Leave Type">
          <TextField source="name" />
        </WrapperField>
      </ReferenceField>
      <DateField source="ptoStartDate"/>
      <DateField source="ptoEndDate"/>
      <TextField source="status"/>
      <TextField source="details"/>
      <NumberField source="days"/>
      <NumberField source="labourHours"/>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const PtoEdit = () => (  
  <EditForm formData={formData} title="Pto" resource="ptos" />
);

export const PtoCreate = () => (
  <CreateForm formData={formData} title="Pto" resource="ptos" />
);
