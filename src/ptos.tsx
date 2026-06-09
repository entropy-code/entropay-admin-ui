import * as React from "react";
import {
  Button,
  Datagrid,
  DateField,
  EditButton,
  List,
  ReferenceField,
  TextField,
  useLocaleState,
  useListContext,
  WrapperField,
  FunctionField,
  useGetList,
  TopToolbar,
  CreateButton,
  DateInput,
  FilterButton,
} from "react-admin";
import { Box, Menu, MenuItem, TextField as MuiTextField } from "@mui/material";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { IPto, IYear } from "./types";
import { IHoliday, IEmployeeCountry, EMPTY_HOLIDAYS } from "./types/pto";
import CancelPtoButton from "./components/buttons/CancelPtoButton";
import { exporter } from "./utils/exporter";
import { calculateWorkingDays, toIsoDate, toUtcDateOnly } from "./utils/workingDaysCalculator";

// @ts-ignore
import * as jsonExport from "jsonexport/dist";

// Build filter string for file naming
const buildFilterString = (filterValues?: Record<string, any>): string => {
  if (!filterValues || Object.keys(filterValues).length === 0) {
    return "all";
  }

  if (filterValues.period === "custom" && filterValues.startDate && filterValues.endDate) {
    const startDate = filterValues.startDate.replace(/-/g, "");
    const endDate = filterValues.endDate.replace(/-/g, "");
    return `from${startDate}-to${endDate}`;
  }

  if (filterValues.period && filterValues.period !== "custom") {
    return filterValues.period
      .replace(/_/g, "-")
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
  }

  return "all";
};

// Custom exporter for PTO with filter-based filename
const ptoExporter = (headers: any[], headersRename: any[], filterValues?: Record<string, any>) => 
  async (records: any[]) => {
    const filterString = buildFilterString(filterValues);
    const fileName = `ptos_${filterString}_${new Date().toISOString().split("T")[0]}.csv`;

    jsonExport(
      records,
      {
        headers: headers,
        rename: headersRename,
        arrayPathString: " - ",
        booleanTrueString: "Active",
        booleanFalseString: "Inactive",
      },
      (err: any, csv: any) => {
        const BOM = '\uFEFF';
        const csvWithBOM = BOM + csv;
        const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    );
  };

function disabledCheck(source: string) {
  return source === "employeeProfile";
}

const calculateDaysByFilter = (
  ptoStartDate: Date | string | undefined | null,
  ptoEndDate: Date | string | undefined | null,
  employeeId: string,
  filterValues: Record<string, any>,
  employeeCountryMap: Map<string, string>,
  holidaysByCountry: Map<string, Set<string>>
): number => {
  if (!ptoStartDate || !ptoEndDate) {
    return 0;
  }

  const employeeCountryId = employeeCountryMap.get(String(employeeId));
  const holidayDateSet = employeeCountryId
    ? holidaysByCountry.get(employeeCountryId) ?? EMPTY_HOLIDAYS
    : EMPTY_HOLIDAYS;

  return calculateWorkingDays(ptoStartDate, ptoEndDate, filterValues, holidayDateSet);
};

const mapPtoExportRow = (
  row: Record<string, any>,
  filterValues: Record<string, any>,
  employeeCountryMap: Map<string, string>,
  holidaysByCountry: Map<string, Set<string>>
) => {
  const ptoStartDate = row.ptoStartDate ?? row.startDate ?? null;
  const ptoEndDate = row.ptoEndDate ?? row.endDate ?? null;
  const employeeFullName =
    row.employeeFullName ??
    `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim();

  return {
    employeeFullName,
    leaveTypeName: row.leaveTypeName ?? row.leaveType ?? "",
    ptoStartDate,
    ptoEndDate,
    status: row.status ?? row.ptoStatus ?? row.state ?? "",
    details: row.details ?? "",
    days: calculateDaysByFilter(
      ptoStartDate,
      ptoEndDate,
      String(row.employeeId ?? ""),
      filterValues,
      employeeCountryMap,
      holidaysByCountry
    ),
  };
};

const formData = [
  {
    title: "Employee",
    inputsList: [
      {
        name: "Employee",
        type: "AutocompleteInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: (choice: any) =>
            `${choice?.lastName ?? ""} ${choice?.firstName ?? ""}`.trim(),
          optionValue: "id",
          ItemsPerPage: 5000,
          multiselect: false,
          required: true,
          sortField: "lastName",
          disabledCheck: disabledCheck,
        },
      },
    ],
  },
  {
    title: "Available Vacation Days",
    inputsList: [
      {
        name: "availableVacationDays",
        type: "textField",
      },
    ]
  },
  {
    title: "LeaveType",
    inputsList: [
      {
        name: "Leave Type",
        type: "selectInput",
        referenceValues: {
          source: "leaveTypeId",
          reference: "leave-types",
          optionText: "name",
          multiselect: false,
          required: true,
          sortField: "name",
        },
      },
      {},
      { name: "ptoStartDate", type: "date", required: true },
      { name: "ptoEndDate", type: "date", required: true },
      { name: "isHalfDay", type: "boolean", label: "Half day off", defaultValue: false },
      {},
    ],
  },
  {
    title: "Details",
    inputsList: [{ name: "details", type: "string" }],
  },
];

const headersRename = ["Employee", "Leave Type", "Start Date", "End Date", "Status", "Details", "Days"];

const headers = ["employeeFullName", "leaveTypeName", "ptoStartDate", "ptoEndDate", "status", "details", "days"];

const filterStyles = {
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

const parseISODate = (val?: string | null) => val && new Date(val).toISOString().slice(0, 10);

const reportFilters = [
  <DateInput source="dateFrom"
             alwaysOn
             label="Start Date"
             sx={filterStyles}
             inputProps={{ inputFormat: "YYYY-MM-DD" }}
             parse={parseISODate}
  />,
  <DateInput source="dateTo"
             alwaysOn
             label="End Date"
             sx={filterStyles}
             inputProps={{ inputFormat: "YYYY-MM-DD" }}
             parse={parseISODate}
  />,
];

const PtoListExportButton = ({ filterValues }: { filterValues: Record<string, any> }) => {
  const { data: exportRows } = useGetList("ptos", {
    filter: filterValues,
    pagination: { page: 1, perPage: 10000 },
  });

  const handleExport = () => {
    if (exportRows) {
      const mappedRows = exportRows.map((row: Record<string, any>) => {
        const employeeCountryMap = new Map();
        const holidaysByCountry = new Map();
        return mapPtoExportRow(row, filterValues, employeeCountryMap, holidaysByCountry);
      });
      ptoExporter(headers, headersRename, filterValues)(mappedRows);
    }
  };

  return (
    <Button
      label="Export"
      startIcon={<FileDownloadIcon />}
      onClick={handleExport}
    />
  );
};

const PtoListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <PtoListExportButton filterValues={{}} />
  </TopToolbar>
);

const PtoDatagrid = () => {
  const [locale] = useLocaleState();
  const listContext = useListContext();
  const filterValues = listContext?.filterValues ?? {};
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

  return (
    <Datagrid>
      <ReferenceField source="employeeId" reference="employees">
        <WrapperField label="Full Name">
          <TextField source="firstName" /> <TextField source="lastName" />
        </WrapperField>
      </ReferenceField>
      <ReferenceField source="leaveTypeId" reference="leave-types">
        <WrapperField label="Leave Type">
          <TextField source="name" />
        </WrapperField>
      </ReferenceField>
      <DateField source="ptoStartDate" locales={locale} />
      <DateField source="ptoEndDate" locales={locale} />
      <FunctionField
        label="Days"
        render={(record: IPto) =>
          calculateDaysByFilter(
            record.ptoStartDate,
            record.ptoEndDate,
            record.employeeId,
            filterValues,
            employeeCountryMap,
            holidaysByCountry
          )
        }
      />
      <TextField source="status" />
      <TextField source="details" />
      <FunctionField
        render={(record: IPto) => (
          <EditButton disabled={record.status === "CANCELLED"} />
        )}
      />
      <FunctionField
        render={(record: IPto) => (
          <CancelPtoButton id={record.id} record={record} />
        )}
      />
    </Datagrid>
  );
};

export const PtoList = () => {
  return (
    <List
      resource="ptos"
      actions={<PtoListActions />}
      filters={reportFilters}
      disableSyncWithLocation
      perPage={50}
    >
      <PtoDatagrid />
    </List>
  );
};

export const PtoEdit = () => (
  <EditForm formData={formData} title="PTO" resource="ptos" />
);

export const PtoCreate = () => (
  <CreateForm formData={formData} title="PTO" resource="ptos" />
);

