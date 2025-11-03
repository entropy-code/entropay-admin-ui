import * as React from "react";
import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  SelectField,
  TextField, useDataProvider,
  useLocaleState,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { exporter } from "./utils/exporter";

export const proficiencyLevel = [
  { id: "CANNOT_PERFORM", name: "Cannot Perform" },
  { id: "CAN_PERFORM_WITH_SUPERVISION", name: "Can perform with supervision" },
  { id: "CAN_PERFORM_WITH_LIMITED_SUPERVISION", name: "Can perform with limited supervision" },
  { id: "CAN_PERFORM_WITHOUT_SUPERVISION", name: "Can perform without supervision" },
  { id: "CAN_TEACH_OTHERS", name: "Can teach others" },
];

const headers = [
  "employee.internalId",
  "employee.firstName",
  "employee.lastName",
  "technology.name",
  "technology.technologyType",
  "proficiencyLevel",
];

const headersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Technology Name",
  "Technology Type",
  "Proficiency Level",
];

const formData = [
  {
    title: "Skills",
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
      {
        name: "technology",
        type: "selectInput",
        referenceValues: {
          source: "technologyId",
          reference: "technologies",
          optionText: "name",
          multiselect: false,
          required: true,
          sortField: "name",
        },
      },
      {
        name: "proficiencyLevel",
        type: "selectList",
        required: true,
        choices: proficiencyLevel,
      },
    ],
  },
];

export const SkillsList = () => {
  const [locale] = useLocaleState();
  const dataProvider = useDataProvider();

  return (
    <List exporter={exporter("skills", headers, headersRename, dataProvider)}>
      <Datagrid>
        <ReferenceField source="employeeId" reference="employees">
          <TextField source="lastName" /> <TextField source="firstName" />
        </ReferenceField>
        <ReferenceField source="technologyId" reference="technologies">
          <TextField source="name" />
        </ReferenceField>
        <SelectField source="proficiencyLevel" choices={proficiencyLevel} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const SkillsEdit = () => (
  <EditForm formData={formData} title="Skills" resource="skills" />
);

export const SkillsCreate = () => (
  <CreateForm formData={formData} title="Skills" resource="skills" />
);