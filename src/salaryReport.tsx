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
  const [allClients, setAllClients] = React.useState<Array<{id: string; name: string}>>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  // Fetch clients incrementally
  const { data: clients, isLoading, error } = useGetList('clients', {
    pagination: { 
      page: currentPage, 
      perPage: 50  // Smaller chunks for better performance
    },
    sort: { field: 'name', order: 'ASC' },
  });

   // Accumulate clients as they load
  React.useEffect(() => {
    if (clients && clients.length > 0) {
      setAllClients(prev => {
        const existing = new Set(prev.map(c => c.id));
        const newClients = clients
          .filter(c => !existing.has(c.id))
          .map(client => ({
            id: client.id,
            name: client.name
          }));
        return [...prev, ...newClients];
      });

      // Check if there are more pages
      if (clients.length < 50) {
        setHasMore(false);
      } else if (currentPage === 1) {
        // Auto-load next few pages for better UX
        setCurrentPage(2);
      }
    }
  }, [clients, currentPage]);

  // Load more clients when user scrolls/searches
  const loadMoreClients = React.useCallback(() => {
    if (hasMore && !isLoading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, isLoading]);

  const employeeReportFilters = [
    <SearchInput source="q" alwaysOn />,
    <AutocompleteInput
      label="Select Client"
      source="clientName"
      choices={allClients}
      optionText="name"
      optionValue="name"
      sx={filterStyles}
      disabled={isLoading && currentPage === 1}
      noOptionsText={
        isLoading && allClients.length === 0
          ? "Loading clients..." 
          : allClients.length === 0 
            ? "No clients found"
            : "No more clients found"
      }
      // Load more when user scrolls to bottom
      ListboxProps={{
        onScroll: (event) => {
          const listbox = event.currentTarget;
          if (listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10) {
            loadMoreClients();
          }
        }
      }}
      loading={isLoading}
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
