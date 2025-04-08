import {
  Datagrid, DateField,
  DateInput,
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
import moment from "moment";


const headersRename = [
  "Internal ID",
  "Year Month",
  "First Name",
  "Last Name",
  "Client Name",
  "Project Name",
  "Rate",
  "Hours",
  "PTO Hours",
  "Total",
  "Paid",
  "Margin",
];

const headers = [
  "internalId",
  "yearMonth",
  "firstName",
  "lastName",
  "clientName",
  "projectName",
  "rate",
  "hours",
  "ptoHours",
  "total",
  "paid",
  "margin",
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
];

export const MarginReportList = () => {
  return (
    <List
      resource="reports/margin"
      exporter={exporter("marginReport", headers, headersRename)}
      actions={
        <>
          <ExportButton />
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
        <DateField source="yearMonth"
          options={{
            month: 'short',
            year: 'numeric',
            day: undefined
          }}
        />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="clientName" />
        <TextField source="projectName" />
        <NumberField source="rate" />
        <NumberField source="hours" />
        <NumberField source="ptoHours" />
        <NumberField source="total" />
        <NumberField source="paid" />
        <NumberField source="margin" />
      </Datagrid>
    </List>
  );
};