import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  useGetList,
  useRecordContext,
  DateField,
  useLocaleState,
  FunctionField,
  TopToolbar,
  Button,
} from "react-admin";
import { blueGrey } from "@mui/material/colors";
import PtosReportsExportButton from "./components/buttons/PtosReportsExportButton";
import { useState } from "react";
import ComboBox from "./components/buttons/ComboBox";
import { Box, SelectChangeEvent, Menu, MenuItem, TextField as MuiTextField } from "@mui/material";
import { toIsoDate, toUtcDateOnly, getFilterRange, calculateWorkingDays } from "./utils/workingDaysCalculator";
import { IHoliday, IEmployeeCountry, EMPTY_HOLIDAYS } from "./types/pto";

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

const PtoDetail = (props: {
  detail: {
    renderAs: string;
    employeeCountryMap?: Map<string, string>;
    holidaysByCountry?: Map<string, Set<string>>;
    filterValues?: Record<string, any>;
  };
  children?: any;
}) => {
  const { detail } = props;
  const [locale] = useLocaleState();
  const record = useRecordContext();
  const selectedFilters = detail.filterValues ?? {};

  const filterBy =
    detail.renderAs === "employees" ? "employeeId" : "clientId";
  const { data: details } = useGetList("reports/ptos/details", {
    filter: { [filterBy]: record?.id, ...selectedFilters },
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
        <FunctionField
          label="Total Days"
          render={(row: any) => {
            if (!detail.employeeCountryMap || !detail.holidaysByCountry || !detail.filterValues) {
              return row.days;
            }
            const employeeId = row.employeeId;
            const employeeCountryId = detail.employeeCountryMap.get(String(employeeId));
            const holidayDateSet = employeeCountryId
              ? detail.holidaysByCountry.get(employeeCountryId) ?? EMPTY_HOLIDAYS
              : EMPTY_HOLIDAYS;
            return calculateWorkingDays(
              row.startDate,
              row.endDate,
              detail.filterValues,
              holidayDateSet
            );
          }}
        />
      </Datagrid>
    </>
  );
};

const PtoReportFilters = ({
  selectOptionValue,
  handleChange,
  selectOptions,
  filterValues,
  setFilterValues,
}: {
  selectOptionValue: string;
  handleChange: (event: SelectChangeEvent) => void;
  selectOptions: { id: number; label: string; value: string }[];
  filterValues: Record<string, any>;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}) => {
  const handleRemoveFilters = () => {
    setFilterValues({});
  };

  return (
    <TopToolbar sx={{ minHeight: { sm: 56 }, display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "nowrap", alignItems: "center", overflowX: "auto", flex: 1, minWidth: 0 }}>
        <ComboBox
          title={"Group By"}
          value={selectOptionValue}
          handleChange={handleChange}
          options={selectOptions}
        />

        <MuiTextField
          type="date"
          label="Start Date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filterValues?.dateFrom ?? ""}
          onChange={(event) => {
            const val = event.target.value;
            if (val) {
              setFilterValues((prev) => ({ ...prev, dateFrom: val }));
            } else {
              setFilterValues((prev) => {
                const newFilters = { ...prev };
                delete newFilters.dateFrom;
                return newFilters;
              });
            }
          }}
          sx={{ width: 150, minWidth: 150, maxWidth: 150, flex: "0 0 150px" }}
        />
        <MuiTextField
          type="date"
          label="End Date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filterValues?.dateTo ?? ""}
          onChange={(event) => {
            const val = event.target.value;
            if (val) {
              setFilterValues((prev) => ({ ...prev, dateTo: val }));
            } else {
              setFilterValues((prev) => {
                const newFilters = { ...prev };
                delete newFilters.dateTo;
                return newFilters;
              });
            }
          }}
          sx={{ width: 150, minWidth: 150, maxWidth: 150, flex: "0 0 150px" }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, ml: "auto", flexShrink: 0 }}>
        <Button label="Clear" onClick={handleRemoveFilters} />
        <PtosReportsExportButton
          reportName={"employeesPtos"}
          headers={ptosReportHeaders}
          headersRename={ptosReportHeadersRename}
          filterValues={filterValues}
        />
      </Box>
    </TopToolbar>
  );
};

export const PtosReport = () => {
  const [selectOptionValue, setSelectValue] = useState("employees");
  const [filterValues, setFilterValues] = React.useState<Record<string, any>>({});

  const { data: holidays = [] } = useGetList<IHoliday>("holidays", {
    filter: {},
    pagination: { page: 1, perPage: 1000 },
    sort: { field: "date", order: "ASC" },
  });

  const { data: employees = [] } = useGetList<IEmployeeCountry>("employees", {
    filter: {},
    pagination: { page: 1, perPage: 5000 },
    sort: { field: "id", order: "ASC" },
  });

  const employeeCountryMap = React.useMemo(
    () =>
      new Map(
        employees
          .filter((employee) => employee.countryId !== undefined && employee.countryId !== null)
          .map((employee) => [String(employee.id), String(employee.countryId)])
      ),
    [employees]
  );

  const holidaysByCountry = React.useMemo(
    () =>
      holidays.reduce((countryMap, holiday) => {
        const countryId = String(holiday.countryId);
        const dateObj = toUtcDateOnly(holiday.date);
        if (!dateObj) return countryMap;
        const holidayDate = toIsoDate(dateObj);
        const dates = countryMap.get(countryId) ?? new Set<string>();
        dates.add(holidayDate);
        countryMap.set(countryId, dates);
        return countryMap;
      }, new Map<string, Set<string>>()),
    [holidays]
  );

  const { data: allDetails = [] } = useGetList<any>("reports/ptos/all-details", {
    filter: filterValues,
    pagination: { page: 1, perPage: 10000 },
    sort: { field: "startDate", order: "DESC" },
  });

  const { employeeWorkingDaysMap, clientWorkingDaysMap } = React.useMemo(() => {
    const employeeTotals = new Map<string, number>();
    const clientTotals = new Map<string, number>();

    allDetails.forEach((row: any) => {
      const employeeId = String(row.employeeId ?? "");
      const employeeCountryId = employeeCountryMap.get(employeeId);
      const holidayDateSet = employeeCountryId
        ? holidaysByCountry.get(employeeCountryId) ?? EMPTY_HOLIDAYS
        : EMPTY_HOLIDAYS;

      const workingDays = calculateWorkingDays(
        row.startDate,
        row.endDate,
        filterValues,
        holidayDateSet,
      );

      if (employeeId) {
        employeeTotals.set(employeeId, (employeeTotals.get(employeeId) ?? 0) + workingDays);
      }

      const clientKey = String(row.clientId ?? "NO_CLIENT");
      clientTotals.set(clientKey, (clientTotals.get(clientKey) ?? 0) + workingDays);
    });

    return {
      employeeWorkingDaysMap: employeeTotals,
      clientWorkingDaysMap: clientTotals,
    };
  }, [allDetails, employeeCountryMap, holidaysByCountry, filterValues]);

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
      <PtoReportFilters
        selectOptionValue={selectOptionValue}
        handleChange={handleChange}
        selectOptions={selectOptions}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      <List
        title="Reports/PTOs"
        actions={false}
      >
        <PtosReportList
          key={`${selectOptionValue}-${JSON.stringify(filterValues)}`}
          renderAs={selectOptionValue}
          filterValues={filterValues}
          employeeCountryMap={employeeCountryMap}
          holidaysByCountry={holidaysByCountry}
          employeeWorkingDaysMap={employeeWorkingDaysMap}
          clientWorkingDaysMap={clientWorkingDaysMap}
        />
      </List>
    </>
  );
};

const PtosReportList = ({
  renderAs = "employees",
  filterValues,
  employeeCountryMap,
  holidaysByCountry,
  employeeWorkingDaysMap,
  clientWorkingDaysMap,
}: {
  renderAs: string;
  filterValues: Record<string, any>;
  employeeCountryMap: Map<string, string>;
  holidaysByCountry: Map<string, Set<string>>;
  employeeWorkingDaysMap: Map<string, number>;
  clientWorkingDaysMap: Map<string, number>;
}) => {
  if (renderAs === "employees") {
    return (
      <EmployeesPtosReportList
        renderAs={renderAs}
        filterValues={filterValues}
        employeeCountryMap={employeeCountryMap}
        holidaysByCountry={holidaysByCountry}
        employeeWorkingDaysMap={employeeWorkingDaysMap}
      />
    );
  } else if (renderAs === "clients") {
    return (
      <ClientsPtosReportList
        renderAs={renderAs}
        filterValues={filterValues}
        employeeCountryMap={employeeCountryMap}
        holidaysByCountry={holidaysByCountry}
        clientWorkingDaysMap={clientWorkingDaysMap}
      />
    );
  }
};

const EmployeesPtosReportList = ({
  renderAs,
  filterValues,
  employeeCountryMap,
  holidaysByCountry,
  employeeWorkingDaysMap,
}: {
  renderAs: string;
  filterValues: Record<string, any>;
  employeeCountryMap: Map<string, string>;
  holidaysByCountry: Map<string, Set<string>>;
  employeeWorkingDaysMap: Map<string, number>;
}) => {
  const actualFilter = Object.keys(filterValues).length > 0 ? filterValues : undefined;

  return (
    <List
      title=" "
      pagination={false}
      resource="reports/ptos/employees"
      actions={false}
      filter={actualFilter}
      disableSyncWithLocation
    >
      <Datagrid
        bulkActionButtons={false}
        expand={
          <PtoDetail
            detail={{
              renderAs,
              employeeCountryMap,
              holidaysByCountry,
              filterValues,
            }}
          />
        }
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
        <FunctionField
          label="Days"
          render={(record: any) => employeeWorkingDaysMap.get(String(record.id)) ?? 0}
        />
      </Datagrid>
    </List>
  );
};

const ClientsPtosReportList = ({
  renderAs,
  filterValues,
  employeeCountryMap,
  holidaysByCountry,
  clientWorkingDaysMap,
}: {
  renderAs: string;
  filterValues: Record<string, any>;
  employeeCountryMap: Map<string, string>;
  holidaysByCountry: Map<string, Set<string>>;
  clientWorkingDaysMap: Map<string, number>;
}) => {
  const actualFilter = Object.keys(filterValues).length > 0 ? filterValues : undefined;

  return (
    <List
      title=" "
      pagination={false}
      resource="reports/ptos/clients"
      actions={false}
      filter={actualFilter}
      disableSyncWithLocation
    >
      <Datagrid
        bulkActionButtons={false}
        expand={
          <PtoDetail
            detail={{
              renderAs,
              employeeCountryMap,
              holidaysByCountry,
              filterValues,
            }}
          />
        }
        sx={{
          [`& .RaDatagrid-expandedPanel`]: { backgroundColor: blueGrey[50] },
          [`& .RaDatagrid-thead`]: { backgroundColor: blueGrey[50] },
        }}
      >
        <TextField source="clientName" />
        <FunctionField
          label="Days"
          render={(record: any) => clientWorkingDaysMap.get(String(record.id)) ?? 0}
        />
      </Datagrid>
    </List>
  );
};




