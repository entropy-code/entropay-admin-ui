import * as React from "react";
import { Button, useGetList } from "react-admin";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import { exporter } from "../../utils/exporter";
import { calculateWorkingDays, toIsoDate, toUtcDateOnly } from "../../utils/workingDaysCalculator";
import { IHoliday, IEmployeeCountry, EMPTY_HOLIDAYS } from "../../types/pto";

const icons = {
  downloadIcon: <FileDownloadIcon />,
};

const extractKeyFromReportName = (reportName: string) => {
  return reportName.slice(0, -4);
};

export const PtosReportsExportButton = ({
  reportName,
  headers,
  headersRename,
  filterValues,
}: {
  reportName: string;
  headers: string[];
  headersRename: string[];
  filterValues?: Record<string, any>;
}) => {
  const key = extractKeyFromReportName(reportName);
  const filterKey = `RaStore.reports/ptos/${key}.listParams`;
  const storedParams = localStorage.getItem(filterKey);
  const params = JSON.parse(storedParams || "{}");
  const yearFilter = filterValues ?? params?.filter;
  const { data: details } = useGetList("reports/ptos/all-details", {
    filter: yearFilter,
  });
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

  const handleExportClick = () => {
    if (details) {
      const mappedRows = details.map((row: Record<string, any>) => {
        const startDate = row.startDate ?? row.ptoStartDate ?? null;
        const endDate = row.endDate ?? row.ptoEndDate ?? null;
        const employeeId = String(row.employeeId ?? "");
        const employeeCountryId = employeeCountryMap.get(employeeId);
        const holidayDateSet = employeeCountryId
          ? holidaysByCountry.get(employeeCountryId) ?? EMPTY_HOLIDAYS
          : EMPTY_HOLIDAYS;

        return {
          ...row,
          internalId: row.internalId ?? row.employeeInternalId ?? "",
          firstName: row.firstName ?? "",
          lastName: row.lastName ?? "",
          clientName: row.clientName ?? row.client?.name ?? "",
          leaveTypeName: row.leaveTypeName ?? row.leaveType ?? "",
          status: row.status ?? row.ptoStatus ?? row.state ?? "",
          startDate,
          endDate,
          days: calculateWorkingDays(startDate, endDate, yearFilter ?? {}, holidayDateSet),
        };
      });

      exporter(reportName, headers, headersRename)(mappedRows);
    }
  };

  return (
    <Button
      variant="text"
      startIcon={icons.downloadIcon}
      onClick={handleExportClick}
      alignIcon="right"
      label="Export"
    />
  );
};

export default PtosReportsExportButton;
