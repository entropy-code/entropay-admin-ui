import * as React from "react";
import {
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
  NumberField,
  WrapperField,
  useLocaleState,
  FunctionField,
  FilterButton,
  Datagrid,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { IAssignment } from "./types";
import QuickFilter from "./components/filters/QuickFilter";

function disabledCheck(source: string) {
  return source === "employeeProfile";
}

const filter = [
  <QuickFilter source="active" label="Active" defaultValue={true} />,
];

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
          required: true,
          disabledCheck: disabledCheck,
        },
      },
      { name: "startDate", type: "date", required: true },
      { name: "endDate", type: "date" },
    ],
  },
  {
    title: "Project",
    inputsList: [
      {
        name: "Project",
        type: "selectInput",
        referenceValues: {
          source: "projectId",
          reference: "projects",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
    ],
  },
  {
    title: "Seniority",
    inputsList: [
      {
        name: "Seniority",
        type: "selectInput",
        referenceValues: {
          source: "seniorityId",
          reference: "seniorities",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
    ],
  },
  {
    title: "Job Position Information",
    inputsList: [
      {
        name: "Role",
        type: "selectInput",
        referenceValues: {
          source: "roleId",
          reference: "roles",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      { name: "hoursPerMonth", type: "number" },
      { name: "billableRate", type: "number" },
      {
        name: "currency",
        type: "selectList",
        choices: [
          { id: "USD", name: "USD - United States dollar" },
          { id: "ARS", name: "ARS - Argentine peso" },
        ],
      },
      { name: "labourHours", type: "string" },
    ],
  },
  {
    title: "End Reason",
    inputsList: [
      {
        name: "endReason",
        type: "string",
      },
    ],
  },
];

export const AssignmentList = () => {
  const [locale] = useLocaleState();
  return (
    <List
      actions={<FilterButton />}
      filterDefaultValues={{ active: true }}
      filters={filter}
    >
      <Datagrid rowClick={"edit"}>
        <ReferenceField source="employeeId" reference="employees">
          <WrapperField label="Full Name">
            <TextField source="lastName" /> <TextField source="firstName" />
          </WrapperField>
        </ReferenceField>
        <FunctionField
          label="Status"
          render={(record: IAssignment) =>
            record.active === true ? "Active" : "Inactive"
          }
        />
        <ReferenceField source="projectId" reference="projects">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="projectId" reference="projects" label="Client">
          <ReferenceField source="clientId" reference="clients">
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <ReferenceField source="roleId" reference="roles">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="hoursPerMonth" />
        <TextField source="billableRate" />
        <ReferenceField source="currency" reference="contracts/currencies">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="labourHours" />
        <ReferenceField source="seniorityId" reference="seniorities">
          <TextField source="name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const AssignmentEdit = () => (
  <EditForm formData={formData} title="Assignment" resource="assignments" />
);

export const AssignmentCreate = () => (
  <CreateForm formData={formData} title="Assignment" resource="assignments" />
);
