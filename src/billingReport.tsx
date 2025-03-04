import {
  Datagrid,
  DateInput,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import { exporter } from "./utils/exporter";
import * as React from "react";


const headersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Client Name",
  "Project Name",
  "Rate",
  "Hours",
  "PTO Hours",
  "Total",
];

const headers = [
  "internalId",
  "firstName",
  "lastName",
  "clientName",
  "projectName",
  "rate",
  "hours",
  "ptoHours",
  "total",
];

const filterStyles = {
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

const parseISODate = (val?: string | null) => val && new Date(val).toISOString().slice(0, 10);

const reportFilters = [
  <DateInput source="startDate"
             alwaysOn
             label="Start Date"
             sx={filterStyles}
             inputProps={{ inputFormat: "YYYY-MM-DD" }}
             parse={parseISODate}
  />,
  <DateInput source="endDate"
             alwaysOn
             label="End Date"
             sx={filterStyles}
             inputProps={{ inputFormat: "YYYY-MM-DD" }}
             parse={parseISODate}
  />,
];

export const BillingReportList = () => {
  return (
    <List
      resource="reports/billing"
      exporter={exporter("billingReport", headers, headersRename)}
      actions={
        <>
          <FilterButton />
          <ExportButton />
        </>
      }
      filters={reportFilters}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField
          source="employeeId"
          reference="employees"
          link="show"
          label="Internal ID"
          sortBy="internalId">
          <TextField source="internalId" />
        </ReferenceField>
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="clientName" />
        <TextField source="projectName" />
        <NumberField source="rate" />
        <NumberField source="hours" />
        <NumberField source="ptoHours" />
        <NumberField source="total" />
      </Datagrid>
    </List>
  );
};