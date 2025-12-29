import * as React from "react";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import {
  CreateButton,
  Datagrid,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  TextField,
  TopToolbar,
  useDataProvider, useLocaleState,
  WrapperField,
} from "react-admin";
import ViewForm from "./components/forms/ViewForm";
import { exporter } from "./utils/exporter";


function disabledCheck(source: string) {
  return source === "employeeProfile";
}

const headers = [
  "employee.internalId",
  "employee.firstName",
  "employee.lastName",
  "client.name",
  "project.name",
  "date",
  "description",
  "hours",
];

const headersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Client",
  "Project",
  "Date",
  "Description",
  "Hours",
];

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
          disabledCheck: disabledCheck,
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
          filter: { active: true },
        },
      },
      { name: "date", type: "date", required: true },
      { name: "description", type: "string", required: true },
      { name: "hours", type: "number", required: true }
    ],
  },];

const overtimeFilters = [
  <SearchInput source="q" alwaysOn />,
];

const OvertimeListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const OvertimeList = () => {
  const [locale] = useLocaleState();
  const dataProvider = useDataProvider();

  return (
    <List
      actions={<OvertimeListActions />}
      filters={overtimeFilters}
      exporter={exporter("overtimes", headers, headersRename, dataProvider)}
    >
      <Datagrid rowClick="edit">
        <ReferenceField source="employeeId" reference="employees">
          <WrapperField label="Full Name">
            <TextField source="lastName" /> <TextField source="firstName" />
          </WrapperField>
        </ReferenceField>

        <ReferenceField
          source="assignmentId"
          reference="assignments"
          label="Client name"
          link={false}
        >
          <ReferenceField
            source="projectId"
            reference="projects"
            link={false}
          >
            <ReferenceField
              source="clientId"
              reference="clients"
              link={false}
            >
              <TextField source="name" />
            </ReferenceField>
          </ReferenceField>
        </ReferenceField>

        <ReferenceField
          source="assignmentId"
          reference="assignments"
          link={false}
          label="Project name"
        >
          <ReferenceField
            source="projectId"
            reference="projects"
            link={false}
          >
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>

        <DateField source="date" locales={locale}/>
        <TextField source="description"
                   style={{
                     display: "inline-block",
                     maxWidth: "10em",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     whiteSpace: "nowrap",
                   }} />
        <NumberField source="hours" />
      </Datagrid>
    </List>
  );
};

export const OvertimeEdit = () => (
  <EditForm formData={formData} title="Overtime" resource="overtimes" />
);

export const OvertimeCreate = () => (
  <CreateForm formData={formData} title="Overtime" resource="overtimes" />
);

export const OvertimeView = () => (
  <ViewForm formData={formData} title="Overtime" resource="overtimes" />
);
