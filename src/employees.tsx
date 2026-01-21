import * as React from "react";
import {
  DateField,
  List,
  RecordContextProvider,
  ShowButton,
  EditButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  useListContext,
  SearchInput,
  useLocaleState,
  FilterButton,
  ReferenceField,
  TextField,
  useGetList,
  FilterLiveSearch,
} from "react-admin";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Chip,
  Switch,
  FormControlLabel,
  Autocomplete,
  TextField as MuiTextField,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  red,
  blueGrey,
  pink,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  orange,
} from "@mui/material/colors";
import { Avatar, Grid } from "@mui/material";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { HasPermissions } from "./components/layout/CustomActions";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListBuilder from "./components/forms/ListBuilder";
import { exporter } from "./utils/exporter";
import QuickFilter from "./components/filters/QuickFilter";

const COLOR_BG = [
  red[500],
  blueGrey[500],
  pink[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  cyan[500],
  teal[500],
  green[500],
  orange[500],
];

const formData = [
  {
    title: "Personal Information",
    inputsList: [
      { name: "internalId", type: "string", required: true },
      { name: "activeSection" },
      {
        name: "Employee",
        type: "multiSelect",
        referenceValues: {
          source: "profile",
          reference: "roles",
          optionText: "name",
          multiselect: true,
          sortField: "name",
        },
      },
      {
        name: "technologies",
        type: "multiSelect",
        referenceValues: {
          source: "technologies",
          reference: "technologies",
          optionText: "name",
          multiselect: true,
          sortField: "name",
        },
      },
      { name: "firstName", type: "string", required: true },
      { name: "lastName", type: "string", required: true },
      { name: "personalEmail", type: "email", required: true },
      { name: "labourEmail", type: "email" },
      { name: "phoneNumber", type: "string" },
      { name: "mobileNumber", type: "string" },
      { name: "birthDate", type: "date" },
      {
        name: "personalNumber",
        type: "string",
        label: "Personal ID/Personal Number",
        required: true,
      },
      { name: "taxId", type: "string", label: "Tax Number" },
      {
        name: "gender",
        type: "selectList",
        source: "gender",
        choices: [
          { id: "MALE", name: "Male", label: "Male" },
          { id: "FEMALE", name: "Female", label: "Female" },
          { id: "NON_BINARY", name: "Non Binary", label: "Non Binary" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Direction",
    inputsList: [
      { name: "address", type: "string" },
      { name: "state", type: "string" },
      { name: "city", type: "string" },
      { name: "zip", type: "string" },
      {
        name: "Country",
        type: "selectInput",
        referenceValues: {
          source: "countryId",
          reference: "countries",
          optionText: "name",
          multiselect: false,
          required: true,
          sortField: "name",
        },
      },
    ],
  },
  {
    title: "Emergency Contact",
    inputsList: [
      { name: "healthInsurance", type: "string" },
      { name: "emergencyContactFullName", type: "string" },
      { name: "emergencyContactPhone", type: "string" },
    ],
  },
  {
    customSections: [
      "paymentInformationSection",
      "childrenSection",
      "notesSection",
    ],
  },
];

const CountryFilter = () => {
  const { data: countries } = useGetList('countries', {
    pagination: { page: 1, perPage: 200 },
    sort: { field: 'name', order: 'ASC' },
  });
  
  const { filterValues, setFilters } = useListContext();

  const handleChange = (event: any, value: any) => {
    const newFilters = { ...filterValues };
    if (value) {
      newFilters.countryId = value.id;
    } else {
      delete newFilters.countryId;
    }
    setFilters(newFilters, {});
  };

  const selectedCountry = countries?.find((c: any) => c.id === filterValues.countryId);

  return (
    <Autocomplete
      options={countries || []}
      getOptionLabel={(option: any) => option.name || ''}
      value={selectedCountry || null}
      onChange={handleChange}
      renderInput={(params) => (
        <MuiTextField {...params} label="Country" variant="outlined" size="small" />
      )}
    />
  );
};

const CityFilter = () => {
  const { data: employees } = useGetList('employees', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'city', order: 'ASC' },
  });

  const { filterValues, setFilters } = useListContext();

  const cityChoices = React.useMemo(() => {
    if (!employees) return [];

    const uniqueCities = [...new Set(employees.map((emp: any) => emp.city).filter(Boolean))];
    return uniqueCities.map(city => ({ id: city, name: city }));
  }, [employees]);

  const handleChange = (event: any, value: any) => {
    const newFilters = { ...filterValues };
    if (value) {
      newFilters.city = value.name;
    } else {
      delete newFilters.city;
    }
    setFilters(newFilters, {});
  };

  const selectedCity = cityChoices.find((c: any) => c.name === filterValues.city);

  return (
    <Autocomplete
      options={cityChoices}
      getOptionLabel={(option: any) => option.name || ''}
      value={selectedCity || null}
      onChange={handleChange}
      renderInput={(params) => (
        <MuiTextField {...params} label="City" variant="outlined" size="small" />
      )}
    />
  );
};

const ClientsFilter = () => {
  const { data: clients } = useGetList('clients', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' },
  });

  const { filterValues, setFilters } = useListContext();

  const handleChange = (event: any, value: any[]) => {
    const newFilters = { ...filterValues };
    if (value && value.length > 0) {
      newFilters.clientId = value.map((v: any) => v.id);
    } else {
      delete newFilters.clientId;
    }
    setFilters(newFilters, {});
  };

  const selectedClients = (clients || []).filter((c: any) =>
    filterValues.clientId && Array.isArray(filterValues.clientId) && filterValues.clientId.includes(c.id)
  );

  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={clients || []}
      getOptionLabel={(option: any) => option.name || ''}
      value={selectedClients}
      onChange={handleChange}
      renderInput={(params) => (
        <MuiTextField {...params} label="Clients" variant="outlined" size="small" />
      )}
    />
  );
};

const ActiveFilter = () => {
  const { filterValues, setFilters } = useListContext();

  const currentValue =
    filterValues.active === true ? 'active' :
    filterValues.active === false ? 'inactive' :
    'all';

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue === null) return;

    const newFilters = { ...filterValues };
    if (newValue === 'all') {
      delete newFilters.active;
    } else if (newValue === 'active') {
      newFilters.active = true;
    } else if (newValue === 'inactive') {
      newFilters.active = false;
    }
    setFilters(newFilters, {});
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        Status
      </Typography>
      <ToggleButtonGroup
        value={currentValue}
        exclusive
        onChange={handleChange}
        fullWidth
        size="small"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="inactive">Inactive</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

const fieldsList = [
  { name: "internalId", type: "text" },
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "countryName", type: "text", label: "Country" },
  { name: "city", type: "text" },
  { name: "labourEmail", type: "textWithCopy" },
  { name: "client", type: "text" },
  { name: "project", type: "text" },
  { name: "role", type: "text" },
  { name: "startDate", type: "date" },
  { name: "rate", type: "number", label: "Rate" },
  { name: "salary", type: "number", label: "Salary" },
  { name: "margin", type: "number", label: "Margin %" },
  { name: "nearestPto", type: "date" },
  { name: "availableDays", type: "number", label: "Available vacations" }
];

const headersRename = [
  "internalId",
  "First Name",
  "Last Name",
  "Country",
  "City",
  "Labour Email",
  "Client",
  "Project",
  "Role",
  "Start Date",
  "Rate",
  "Salary",
  "Margin %",
  "Nearest PTO",
  "Available Vacation Days",
];

type RadioValueType = "list" | "card";

export const EmployeeList = () => {
  const [viewOptionValue, setRadioValue] = useState<RadioValueType>("list");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value as RadioValueType);
  };

  const viewOptions: {
    id: number;
    label: string;
    value: RadioValueType;
  }[] = [
    {
      id: 1,
      label: "List",
      value: "list",      
    },
    {
      id: 2,
      label: "Card",
      value: "card",
    },
  ];

  return (
    <List
      aside={<FilterSidebar />}
      sort={{ field: "internalId", order: "ASC" }}
      component="div"
      actions={false}

      exporter={exporter(
        "employees",
        fieldsList.map((field) => {
          return field.name;
        }),
        headersRename
      )}
    >
      <TopToolbar
        sx={{
          minHeight: { sm: 56 },
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
          <FormControlLabel
            control={
              <Switch
                checked={viewOptionValue === "card"}
                onChange={() => setRadioValue(viewOptionValue === "list" ? "card" : "list")}
                color="primary"
              />
            }
            label={viewOptionValue === "list" ? "List" : "Card"}
            sx={{ ml: 2 }}
          />
          {HasPermissions("employees", "create") && <CreateButton />}
          <ExportButton />
        </Box>
      </TopToolbar>
      <EmployeeInformation renderAs={viewOptionValue} />
    </List>
  );
};

const EmployeeInformation = ({ renderAs = "list" }) => {
  const { data, isLoading } = useListContext();
  const [locale] = useLocaleState();

  if (isLoading) {
    return null;
  }

  if (renderAs === "card") {
    return (
      <Grid container spacing={2} sx={{ marginTop: 0 }}>
        {(data || []).map((record, index) => (
          <RecordContextProvider key={index} value={record}>
            <Grid xs={2} item>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`${record.id}/show`}
                  sx={{ minHeight: "380px" }}
                  style={{ textDecoration: "none" }}
                >
                  <CardContent sx={{ padding: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar
                        alt="Employee"
                        sx={{
                          width: 100,
                          height: 100,
                          bgcolor: COLOR_BG[
                            `${record.internalId}`.charAt(
                              `${record.internalId}`.length - 1
                            ) as keyof typeof COLOR_BG
                          ] as string,
                          fontSize: 50,
                          margin: 2,
                        }}
                      >
                        {`${record.firstName}`.charAt(0)}
                        {`${record.lastName}`.charAt(0)}
                      </Avatar>
                    </Box>
                    <Box sx={{ minHeight: 155 }}>
                      <Typography noWrap variant="h5" component="h5" align="center">
                        {record.internalId}
                      </Typography>
                      <Typography
                        noWrap
                        variant="h5"
                        component="h5"
                        align="center"
                      >
                        {record.firstName} {record.lastName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <Typography noWrap>
                          {record.labourEmail ? record.labourEmail : "-"}
                        </Typography>
                        {record.labourEmail && (
                          <Tooltip title="Copy to clipboard">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(record.labourEmail);
                              }}
                              sx={{ padding: '2px' }}
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      <Typography noWrap align="center">
                        <DateField source="startDate" locales={locale} />
                      </Typography>
                      <Typography noWrap align="center">
                        {record.state} /
                        <ReferenceField
                          source="countryId"
                          reference="countries"
                          link="show"
                        >
                          {} <TextField source="name" />
                        </ReferenceField>
                      </Typography>
                      <Typography noWrap align="center">
                        {record.client} / {record.project}
                      </Typography>
                      <Typography noWrap align="center">
                        {record.role}
                      </Typography>
                      <Typography
                        variant={undefined}
                        component="h3"
                        align="center"
                      >
                        <Chip
                          label={"Available vacations: " + record.availableDays}
                        />
                      </Typography>
                      <Typography
                        variant={undefined}
                        component="h6"
                        align="center"
                      >
                        {record.nearestPto && (
                          <Chip
                            label={
                              <>
                                Next time off:{" "}
                                <DateField
                                  source="nearestPto"
                                  locales={locale}
                                />
                              </>
                            }
                            variant="filled"
                            color="success"
                          />
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CardActions>
                    <ShowButton />
                    {HasPermissions("employees", "update") && <EditButton />}
                  </CardActions>
                </div>
              </Card>
            </Grid>
          </RecordContextProvider>
        ))}
      </Grid>
    );
  } else {
    return (
      <Box sx={{ marginTop: "15px" }}>
        <ListBuilder
          fieldsList={fieldsList}
          locale={locale}
          hasShowButton={true}
          resource="employees"
        />
      </Box>
    );
  }
};

export const EmployeeEdit = () => (
  <EditForm formData={formData} title="Employees" resource="employees" />
);

export const EmployeeCreate = () => (
  <CreateForm formData={formData} title="Employees" resource="employees" />
);

export const FilterSidebar = () => {
  return (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 250, maxWidth: 250, minWidth: 250 }}>
      <CardContent>
        <FilterLiveSearch />
        <ClientsFilter />
        <CountryFilter />
        <CityFilter />
        <ActiveFilter />
      </CardContent>
    </Card>
  );
};