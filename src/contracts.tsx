import * as React from "react";
import {
  ArrayField,
  Datagrid,
  DateField,
  EditButton,
  FilterButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  ShowButton,
  SingleFieldList,
  TextField,
  useLocaleState,
  WrapperField,
} from "react-admin";

import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { CustomizableChipField } from "./components/fields";
import { IContract, IPaymentSettlement } from "./types";
import ViewForm from "./components/forms/ViewForm";
import QuickFilter from "./components/filters/QuickFilter";

function disabledCheck(source: string) {
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
          sortField: "value"
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
        },
      },
      { name: "startDate", type: "date", required: true },
      { name: "endDate", type: "date" },
      {
        name: "End Reason",
        type: "selectInput",
        referenceValues: {
          source: "endReasonId",
          reference: "end-reasons",
          optionText: "name",
          multiselect: false,
          required: false,
          disabledCheck: disabledCheck,
          sortField: "name",
        },
      },
    ],
  },
  {
    title: "Job Position Information",
    inputsList: [
      {
        name: "profile",
        type: "AutocompleteInput",
        referenceValues: {
          source: "roleId",
          reference: "roles",
          optionText: "name",
          optionValue: "id",
          ItemsPerPage: 100,
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
          sortField: "name",
        },
      },
      { name: "hoursPerMonth", type: "number" },
      { name: "benefits", type: "string" },
    ],
  },
  {
    customSections: ["notesSection", "paymentSettlementSection"],
  },
];

const contractFilters = [
  <SearchInput source="q" alwaysOn />,
  <QuickFilter source="active" label="Active" defaultValue={true} />,
];

export const ContractList = () => {
  const [locale] = useLocaleState();
  return (
    <List
      actions={<FilterButton />}
      filters={contractFilters}
      filterDefaultValues={{ active: true }}
    >
      <Datagrid rowClick="edit">
        <ReferenceField source="companyId" reference="companies" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="contractType" reference="contracts/contract-types" link={false}>
          <TextField source="value" />
        </ReferenceField>
        <ReferenceField source="employeeId" reference="employees" link="show">
          <WrapperField label="Full Name">
            <TextField source="lastName" /> <TextField source="firstName" />
          </WrapperField>
        </ReferenceField>
        <FunctionField
          label="Status"
          render={(record: IContract) =>
            record.active ? "Active" : "Inactive"
          }
        />
        <ArrayField source="paymentSettlement" label="Salary">
          <SingleFieldList linkType={false}>
            <CustomizableChipField<IPaymentSettlement>>
              {(record) => {
                if (record) {
                  const salary =
                    `${record.salary}` === "null" ? "-" : `${record.salary}`;
                  return `${record.currency} ${salary}/${record.modality
                    .charAt(0)
                    .toLowerCase()}`;
                }
              }}
            </CustomizableChipField>
          </SingleFieldList>
        </ArrayField>
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <ReferenceField source="roleId" reference="roles" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="endReasonId" reference="end-reasons" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="seniorityId" reference="seniorities" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="hoursPerMonth" />
        <TextField source="benefits" />
        <TextField source="notes" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const ContractEdit = () => (
  <EditForm formData={formData} title="Contract" resource="contracts" />
);

export const ContractCreate = () => (
  <CreateForm formData={formData} title="Contract" resource="contracts" />
);

export const ContractView = () => (
  <ViewForm formData={formData} title="Contract" resource="contracts" />
);
