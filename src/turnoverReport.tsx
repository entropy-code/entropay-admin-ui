import {
  Datagrid,
  DateField,
  DateInput,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  SearchInput,
  SelectInput,
  TextField,
} from "react-admin";
import { exporter } from "./utils/exporter";
import { EXPORT_CONFIG } from "./utils/constants";
import * as React from "react";
import moment from "moment";


const headersRename = [
  "Level Type",
  "Id",
  "Name",
  "Parent Id",
  "Period Type",
  "Year Month",
  "Employees At Start",
  "Employees Left",
  "Employees At End",
  "Turnover Rate",
];

const headers = [
  "levelType",
  "id",
  "name",
  "parentId",
  "periodType",
  "yearMonth",
  "employeesAtStart",
  "employeesLeft",
  "employeesAtEnd",
  "turnoverRate",
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
  <SearchInput source="name" alwaysOn />,

  <SelectInput label="Level" source="levelType" sx={filterStyles} alwaysOn
               choices={[
                 { id: "COMPANY", name: "Company" },
                 { id: "CLIENT", name: "Client" },
                 { id: "PROJECT", name: "Project" },
               ]}
  />,
  <SelectInput label="Period" source="periodType" sx={filterStyles} alwaysOn
               choices={[
                 { id: "OVERALL", name: "Overall" },
                 { id: "MONTHLY", name: "Monthly" },
               ]}
  />,
];

export const TurnoverReportList = () => {
  return (
    <List
      resource="reports/turnover/flat"
      exporter={exporter("turnoverReport", headers, headersRename)}
      actions={
        <>
          <FilterButton />
          <ExportButton maxResults={EXPORT_CONFIG.maxResults} />
        </>
      }
      filters={reportFilters}
      filterDefaultValues={{
        startDate: defaultStartDate,
        endDate: defaultEndDate,
      }}
      disableSyncWithLocation
      // sort={{ field: "internalId", order: "ASC" }}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="levelType" />
        <TextField source="name" />
        <TextField source="periodType" />
        <DateField source="yearMonth"
                   options={{
                     month: "short",
                     year: "numeric",
                     day: undefined,
                   }}
        />
        <NumberField source="employeesAtStart" />
        <NumberField source="employeesLeft" />
        <NumberField source="employeesAtEnd" />
        <NumberField source="turnoverRate" />
      </Datagrid>
    </List>
  );
};