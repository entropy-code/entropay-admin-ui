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
} from "react-admin";
import { blueGrey } from "@mui/material/colors";
import PtosReportsExportButton from "./components/buttons/PtosReportsExportButton"

const headersRename = [
  "Internal ID",
  "Fist Name",
  "Last Name",
  "Client",
  "Leave Reason",
  "Days",
  "Start Date",
  "End Date"
];

const headers = [
  "internalId",
  "firstName",
  "lastName",
  "clientName",
  "leaveTypeName",
  "days",
  "startDate",
  "endDate"
];
const YearOptions = () => {
  const { data: years } = useGetList("ptos/years");
  return years?.map((year) => ({ id: year.id, name: year.year })) || [];
};


export const PtoDetail = () => {
  const [locale] = useLocaleState();
  const record = useRecordContext();
  const listContext = useListContext();
  const yearFilter = listContext.filterValues;
  const { data: details } = useGetList(
    'reports/ptos/details',
    {
      filter: {clientId: record.id, ...yearFilter}
    }
);

return (
    <>
      <Datagrid data={details} bulkActionButtons={false}
      sx={{
        [`& .RaDatagrid-headerCell`]: {
          backgroundColor: blueGrey[50]
        }
      }}>
        <FunctionField label="Employee" sortBy="lastName" render={ 
          record => `${record.lastName} ${record.firstName}` } />
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

  return(
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
}

export const ClientsPtosReportList = () => {
  const currentYear = new Date().getFullYear();
  return (
    <List
      filters={PtoFilters()}
      filterDefaultValues={{year: currentYear}}
      resource="reports/ptos/clients"
      actions={
        <>
          <PtosReportsExportButton report={"ptosByClients"} headers={headers} headersRename={headersRename} />
        </>
      }
    >
      <Datagrid bulkActionButtons={false}
        expand={<PtoDetail />}
        sx={{
          [`& .RaDatagrid-expandedPanel`]: {backgroundColor: blueGrey[50]},
          [`& .RaDatagrid-thead`]: {backgroundColor: blueGrey[50]},
        }}
      >
        <TextField source="clientName" />
        <NumberField source="totalDays" />
      </Datagrid>
    </List>
  );
};
