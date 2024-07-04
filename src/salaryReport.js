import {
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  TextField,
} from "react-admin";
import { exporter } from "./utils/exporter";
import * as React from "react";

const headersRename = ["Internal ID", "First Name", "Last Name", "Client Name", "Salary", "Rate", "Modality", "Currency"
  , "Platform", "Country"];

const headers = ["internalId", "firstName", "lastName", "clientName", "salary", "rate", "modality", "currency",
  "platform", "country"];


const employeeReportFilters = [
  <SearchInput source="q" alwaysOn />,
];

export const SalariesReportList = () => {
  return (
    <List
      resource="reports/salaries"
      exporter={exporter("employeesReport", headers, headersRename)}
      actions={<> <FilterButton /> <ExportButton /> </>}
      filters={employeeReportFilters}
    >
      <Datagrid
        bulkActionButtons={false}
      >
        <ReferenceField source="employeeId" reference="employees" link="show" label="Internal ID">
          <TextField source="internalId" />
        </ReferenceField>
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="clientName" />
        <NumberField source="salary" />
        <NumberField source="rate" />
        <TextField source="modality" />
        <TextField source="currency" />
        <TextField source="platform" />
        <TextField source="country" />
      </Datagrid>
    </List>
  );
};
