import {
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  TextField,
  AutocompleteInput,
  useGetList,
} from "react-admin";
import { exporter } from "./utils/exporter";
import * as React from "react";
import { EXPORT_CONFIG } from "./utils/constants";

const headersRename = [
  "Internal ID",
  "First Name",
  "Last Name",
  "Client Name",
  "Salary",
  "Rate",
  "Modality",
  "Currency",
  "Platform",
  "Country",
];

const headers = [
  "internalId",
  "firstName",
  "lastName",
  "clientName",
  "salary",
  "rate",
  "modality",
  "currency",
  "platform",
  "country",
];

const filterStyles = {
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

export const SalariesReportList = () => {
  // Fetch clients from database
  const { data: clients, isLoading, error } = useGetList('clients', {
    pagination: { page: 1, perPage: 1000 }, // Get all clients
    sort: { field: 'name', order: 'ASC' },
  });

  // Create clientList array from the fetched data
  const clientList = React.useMemo(() => {
    if (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
    if (!clients) return [];
    return clients.map(client => ({
      id: client.name,
      name: client.name
    }));
  }, [clients, error]);

  const employeeReportFilters = [
    <SearchInput source="q" alwaysOn />,
    <AutocompleteInput
      label="Select Client"
      source="clientName"
      choices={clientList}
      optionText="name"
      optionValue="id"
      sx={filterStyles}
      disabled={isLoading}
      noOptionsText={isLoading ? "Loading clients..." : "No clients found"}
    />
  ];

  return (
    <List
      resource="reports/salaries"
      exporter={exporter("employeesReport", headers, headersRename)}
      actions={
        <>
          {" "}
          <FilterButton />
          <ExportButton maxResults={EXPORT_CONFIG.maxResults}/>
          {" "}
        </>
      }
      filters={employeeReportFilters}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField
          source="employeeId"
          reference="employees"
          link="show"
          label="Internal ID"
          sortBy="internalId"
        >
          <TextField source="internalId" />
        </ReferenceField>
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="clientName" />
        <NumberField source="salary" />
        <NumberField source="rate" />
        <TextField source="modality" />
        <TextField source="currency" />
        <TextField source="platform" />
        <TextField source="country" />
      </Datagrid>
    </List>
  );
};
