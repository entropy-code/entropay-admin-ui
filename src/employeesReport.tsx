import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useLocaleState,
  NumberField,
  ArrayField,
  SingleFieldList,
  FunctionField,
  FilterButton,
  ExportButton,
  useTheme,
} from "react-admin";
import { CustomizableChipField } from "./components/fields";
import { exporter } from "./utils/exporter";
import QuickFilter from "./components/filters/QuickFilter";

const headersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Labour Email",
  "Country",
  "City",
  "Role",
  "Seniority",
  "Client",
  "Project",
  "Profile",
  "Technologies",
  "Contract Status",
  "Start Date",
  "End Date",
  "USD Payment",
  "ARS Payment",
];

const headers = [
  "internalId",
  "firstName",
  "lastName",
  "labourEmail",
  "country",
  "city",
  "role",
  "seniority",
  "clientName",
  "projectName",
  "profile",
  "technologiesNames",
  "activeContract",
  "startDate",
  "endDate",
  "usdPayment",
  "arsPayment",
];

const employeeReportFilters = [
  <QuickFilter
    source="activeContract"
    label="Active Contract"
    defaultValue={true}
  />,
];

export const EmployeeReportList = () => {
  const [locale] = useLocaleState();
  const [themeMode] = useTheme();
  const COLOR_GREEN = "#eeffee";
  const COLOR_GREY = "#5c5f63";
  const activeRowColor = themeMode === 'light' ? COLOR_GREEN : COLOR_GREY
  const rowStyle = (record: { activeContract: boolean }) => ({
      backgroundColor: record.activeContract ? activeRowColor : 'inherit'
  });

  return (
    <List
      resource="reports/employees"
      exporter={exporter("employeesReport", headers, headersRename)}
      actions={
        <>
          {" "}
          <FilterButton /> <ExportButton />{" "}
        </>
      }
      filters={employeeReportFilters}
      filterDefaultValues={{ active: true }}
    >
      <Datagrid rowSx={rowStyle} bulkActionButtons={false}>
        <TextField source="internalId" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="labourEmail" />
        <TextField source="country" />
        <TextField source="city" />
        <TextField source="role" />
        <TextField source="seniority" />
        <TextField source="clientName" />
        <TextField source="projectName" />
        <ArrayField source="profile" label="Profile">
          <SingleFieldList>
            <CustomizableChipField>
              {(record) => {
                if (record) {
                  const profile = `${record}`;
                  return profile;
                }
              }}
            </CustomizableChipField>
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="technologiesNames" label="Technologies">
          <SingleFieldList>
            <CustomizableChipField>
              {(record) => {
                if (record) {
                  const technologiesNames = `${record}`;
                  return technologiesNames;
                }
              }}
            </CustomizableChipField>
          </SingleFieldList>
        </ArrayField>
        <FunctionField
          label="Contract status"
          render={(record) => (record.activeContract ? "Active" : "Inactive")}
        />
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <NumberField source="usdPayment" />
        <NumberField source="arsPayment" />
      </Datagrid>
    </List>
  );
};
