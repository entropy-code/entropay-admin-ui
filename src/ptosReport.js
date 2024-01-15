import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ExportButton,
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

export const PtoReportList = () => {
  return (
    <List
      resource="reports/ptos"
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
