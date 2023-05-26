import * as React from "react";
import {
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
  NumberField,
  WrapperField,
  FunctionField,
  ArrayField,
  SingleFieldList,
  useLocaleState,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { CustomizableChipField, FilteredDatagrid } from "./components/fields";

function disabledCheck(source) {
  return source === "employeeProfile";
}

const formData = [
  {
    title: "Company",
    inputsList: [
      {
        name: "Company",
        type: "selectInput",
        referenceValues: {
          source: "companyId",
          reference: "companies",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      {
        name: "ContractType",
        type: "selectInput",
        referenceValues: {
          source: "contractType",
          reference: "contracts/contract-types",
          optionText: "value",
          multiselect: false,
          required: true,
        },
      },
    ],
  },
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
    title: "Job Position Information",
    inputsList: [
      {
        name: "profile",
        type: "selectInput",
        referenceValues: {
          source: "roleId",
          reference: "roles",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      {
        name: "seniority",
        type: "selectInput",
        referenceValues: {
          source: "seniorityId",
          reference: "seniorities",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      { name: "hoursPerMonth", type: "number" },
      { name: "vacations", type: "number" },
      { name: "benefits", type: "string" },
    ],
  },
  {
    customSections: ["notesSection", "paymentSettlementSection"],
  },
];

export const ContractList = () => {
  const [locale] = useLocaleState();
  return (
    <List>
      <FilteredDatagrid
        dataGridProps={{ rowClick: "edit" }}
        filterFn={(data) => data.active}
      >
        <ReferenceField source="companyId" reference="companies">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="contractType"
          reference="contracts/contract-types"
        >
          <TextField source="value" />
        </ReferenceField>
        <ReferenceField source="employeeId" reference="employees">
          <WrapperField label="Full Name">
            <TextField source="lastName" /> <TextField source="firstName" />
          </WrapperField>
        </ReferenceField>
        <FunctionField
          label="Status"
          render={(record) => (record.active === true ? "Active" : "Inactive")}
        />
        <ArrayField source="paymentSettlement" label="Salary">
          <SingleFieldList linkType={false}>
            <CustomizableChipField source="salary">
              {(record) => {
                if (record) {
                  const salary =
                    `${record.salary}` === "null" ? "-" : `${record.salary}`;
                  const label = `${record.currency} ${salary}/${record.modality
                    .charAt(0)
                    .toLowerCase()}`;
                  return label;
                }
                return null;
              }}
            </CustomizableChipField>
          </SingleFieldList>
        </ArrayField>
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <ReferenceField source="roleId" reference="roles">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="seniorityId" reference="seniorities">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="hoursPerMonth" />
        <NumberField source="vacations" />
        <TextField source="benefits" />
        <TextField source="notes" />
        <EditButton />
      </FilteredDatagrid>
    </List>
  );
};

export const ContractEdit = () => (
  <EditForm formData={formData} title="Contract" />
);

export const ContractCreate = () => (
  <CreateForm formData={formData} title="Contract" resource="contracts" />
);
