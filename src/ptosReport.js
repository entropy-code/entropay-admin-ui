import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ExportButton,
  useGetList,
  Filter,
  SelectInput,
} from "react-admin";
import { exporter } from "./utils/exporter";

const headers = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Client",
  "Leave Reason",
  "Total Days",
];

const headersOrder = [
  "internalId",
  "firstName",
  "lastName",
  "clientName",
  "leaveTypeName",
  "totalDays",
];

const reportFieldsList = [
  { name: "internalId", type: "number" },
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "clientName", type: "text" },
  { name: "leaveTypeName", type: "text" },
  { name: "totalDays", type: "number" },
];

const YearOptions = () => {
  const { data: years } = useGetList("ptos/years");
  return years?.map((year) => ({ id: year.id, name: year.year })) || [];
};

export const PtoReportList = () => {
  const currentYear = new Date().getFullYear();
  const yearsByFilter = YearOptions();

  if (!currentYear || yearsByFilter.length === 0) {
    return <></>;
  }

  const PtoFilters = () => (
    <Filter>
      <SelectInput
        source="year"
        label="Year"
        emptyText="All years"
        choices={yearsByFilter}
        alwaysOn
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </Filter>
  );

  return (
    <List
      filters={PtoFilters()}
      resource="reports/ptos/employees"
      exporter={exporter(reportFieldsList, "ptosReport", headers, headersOrder)}
      actions={
        <>
          <ExportButton />
        </>
      }
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="internalId" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="clientName" />
        <NumberField source="totalDays" />
      </Datagrid>
    </List>
  );
};
