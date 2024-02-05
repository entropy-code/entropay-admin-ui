import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ExportButton,
  useGetList,
  Filter,
  SelectInput,
  useRecordContext,
  DateField,
  useLocaleState,
  required,
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


export const PtoDetail = () => {
  const [locale] = useLocaleState();
  const record = useRecordContext();
  const { data: details } = useGetList(
    'reports/ptos/details',
    {
      filter: {employeeId: record.id}
    }
);

return (
    <>
      <Datagrid data={details} bulkActionButtons={false}>
        <TextField source="leaveTypeName" label="Leave Type"></TextField>
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <TextField source="days" label="Total Days"></TextField>
      </Datagrid>
    </>
  );
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
        choices={yearsByFilter}
        alwaysOn
        validate={required()}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </Filter>
  );

  return (
    <List
      filters={PtoFilters()}
      filterDefaultValues={{year: currentYear}}
      resource="reports/ptos/employees"
      exporter={exporter(reportFieldsList, "ptosReport", headers, headersOrder)}
      actions={
        <>
          <ExportButton />
        </>
      }
    >
      <Datagrid bulkActionButtons={false}
        expand={<PtoDetail/>}
      >
        <TextField source="internalId" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="clientName" />
        <NumberField source="totalDays" />
      </Datagrid>
    </List>
  );
};
