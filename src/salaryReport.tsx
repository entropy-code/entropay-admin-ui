import {
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  TextField,
  TextInput,
} from "react-admin";
import { exporter } from "./utils/exporter";
import * as React from "react";
import { EXPORT_CONFIG } from "./utils/constants";

const headersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Client Name",
  "Salary",
  "Rate",
  "Modality",
  "Currency",
  "Platform",
  "Country",
];

const headers = [
  "internalId",
  "firstName",
  "lastName",
  "clientName",
  "salary",
  "rate",
  "modality",
  "currency",
  "platform",
  "country",
];

const filterStyles = {
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

const employeeReportFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Client Name" source="clientName" sx={filterStyles}/>,
];

export const SalariesReportList = () => {
  return (
    <List
      resource="reports/salaries"
      exporter={exporter("salaryReport", headers, headersRename)}
      actions={
        <>
          {" "}
          <FilterButton />
          <ExportButton maxResults={EXPORT_CONFIG.maxResults}/>
          {" "}
        </>
      }
      filters={employeeReportFilters}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField
          source="employeeId"
          reference="employees"
          link="show"
          label="Internal ID"
          sortBy="internalId"
        >
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
