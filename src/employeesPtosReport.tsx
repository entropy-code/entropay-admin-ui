import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  useGetList,
  Filter,
  SelectInput,
  useRecordContext,
  DateField,
  useLocaleState,
  required,
  useListContext,
  FunctionField,
  TopToolbar,
} from "react-admin";
import { blueGrey } from "@mui/material/colors";
import PtosReportsExportButton from "./components/buttons/PtosReportsExportButton";
import { useState } from "react";
import ComboBox from "./components/buttons/ComboBox";
import { Box, SelectChangeEvent } from "@mui/material";

const ptosReportHeadersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Client",
  "Leave Reason",
  "Days",
  "Start Date",
  "End Date",
];

const ptosReportHeaders = [
  "internalId",
  "firstName",
  "lastName",
  "clientName",
  "leaveTypeName",
  "days",
  "startDate",
  "endDate",
];

const YearOptions = () => {
  const { data: years } = useGetList("ptos/years");
  return years?.map((year) => ({ id: year.id, name: year.year })) || [];
};

const PtoDetail = (detail: {
  detail: {
    renderAs: string;
  };
}) => {
  const [locale] = useLocaleState();
  const record = useRecordContext();
  const listContext = useListContext();
  const yearFilter = listContext.filterValues;

  const filterBy =
    detail.detail.renderAs === "employees" ? "employeeId" : "clientId";
  const { data: details } = useGetList("reports/ptos/details", {
    filter: { [filterBy]: record?.id, ...yearFilter },
  });

  return (
    <>
      <Datagrid
        data={details}
        bulkActionButtons={false}
        sx={{
          [`& .RaDatagrid-headerCell`]: {
            backgroundColor: blueGrey[50],
          },
        }}
      >
        <TextField source="leaveTypeName" label="Leave Type"></TextField>
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <TextField source="days" label="Total Days"></TextField>
      </Datagrid>
    </>
  );
};

const PtoFilters = () => {
  const currentYear = new Date().getFullYear();
  const yearsByFilter = YearOptions();

  if (!currentYear || yearsByFilter.length === 0) {
    return <></>;
  }

  return (
    <Filter>
      <SelectInput
        source="year"
        label="Year"
        choices={yearsByFilter}
        alwaysOn
        validate={required()}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </Filter>
  );
};

export const PtosReport = () => {
  const [selectOptionValue, setSelectValue] = useState("employees");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value);
  };

  const selectOptions = [
    {
      id: 1,
      label: "Employees",
      value: "employees",
    },
    {
      id: 2,
      label: "Clients",
      value: "clients",
    },
  ];

  return (
    <>
      <List
        title="Reports/PTOs"
        actions={
          <>
            <PtosReportsExportButton
              reportName={"employeesPtos"}
              headers={ptosReportHeaders}
              headersRename={ptosReportHeadersRename}
            />
          </>
        }
      >
        <TopToolbar
          sx={{
            minHeight: { sm: 56 },
            justifyContent: "left",
          }}
        >
          <Box marginBottom="20px">
            <ComboBox
              title={"Group By"}
              value={selectOptionValue}
              handleChange={handleChange}
              options={selectOptions}
            />
          </Box>
          <Box>
            <PtoFilters />
          </Box>
        </TopToolbar>
        <PtosReportList renderAs={selectOptionValue} />
      </List>
    </>
  );
};

const PtosReportList = ({ renderAs = "employees" }) => {
  if (renderAs === "employees") {
    return <EmployeesPtosReportList renderAs={renderAs} />;
  } else if (renderAs === "clients") {
    return <ClientsPtosReportList renderAs={renderAs} />;
  }
};

const EmployeesPtosReportList = (renderAs: { renderAs: string }) => {
  const currentYear = new Date().getFullYear();
  return (
    <List
      title=" "
      pagination={false}
      filterDefaultValues={{ year: currentYear }}
      resource="reports/ptos/employees"
      actions={false}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<PtoDetail detail={renderAs} />}
        sx={{
          [`& .RaDatagrid-expandedPanel`]: { backgroundColor: blueGrey[50] },
          [`& .RaDatagrid-thead`]: { backgroundColor: blueGrey[50] },
        }}
      >
        <TextField source="internalId" />
        <FunctionField
          label="Employee"
          sortBy="lastName"
          render={(record) => `${record.lastName} ${record.firstName}`}
        />
        <TextField source="clientName" />
        <NumberField source="totalDays" />
      </Datagrid>
    </List>
  );
};

const ClientsPtosReportList = (renderAs: { renderAs: string }) => {
  const currentYear = new Date().getFullYear();
  return (
    <List
      title=" "
      pagination={false}
      filterDefaultValues={{ year: currentYear }}
      resource="reports/ptos/clients"
      actions={false}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<PtoDetail detail={renderAs} />}
        sx={{
          [`& .RaDatagrid-expandedPanel`]: { backgroundColor: blueGrey[50] },
          [`& .RaDatagrid-thead`]: { backgroundColor: blueGrey[50] },
        }}
      >
        <TextField source="clientName" />
        <NumberField source="totalDays" />
      </Datagrid>
    </List>
  );
};
