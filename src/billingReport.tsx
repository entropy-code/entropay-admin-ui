import {
  Datagrid,
  DateInput,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  TextField, TextInput,
} from "react-admin";
import { exporter } from "./utils/exporter";
import * as React from "react";
import moment from "moment";
import { EXPORT_CONFIG } from "./utils/constants";


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
  "Notes",
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
  "notes",
];

const filterStyles = {
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

const parseISODate = (val?: string | null) => val && new Date(val).toISOString().slice(0, 10);

// Calculate the first day of the previous month and the last day of the previous month
const defaultStartDate = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
const defaultEndDate = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");

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
  <SearchInput source="q" alwaysOn/>,
  <TextInput label="Client Name" source="clientName" sx={filterStyles}/>,
  <TextInput label="Project Name" source="projectName" sx={filterStyles}/>,
];

export const BillingReportList = () => {
  return (
    <List
      resource="reports/billing"
      exporter={exporter("billingReport", headers, headersRename)}
      actions={
        <>
          <FilterButton />
          <ExportButton maxResults={EXPORT_CONFIG.maxResults}/>
        </>
      }
      filters={reportFilters}
      filterDefaultValues={{
        startDate: defaultStartDate,
        endDate: defaultEndDate,
      }}
      disableSyncWithLocation
      sort={{ field: "internalId", order: "ASC" }}
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
        <TextField source="notes" />
      </Datagrid>
    </List>
  );
};