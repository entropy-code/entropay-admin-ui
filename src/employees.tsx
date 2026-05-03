import * as React from "react";
import {
  DateField,
  List,
  RecordContextProvider,
  ShowButton,
  EditButton,
  CreateButton,
  useListContext,
  useLocaleState,
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
  Autocomplete,
  TextField as MuiTextField,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
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
import { Link } from "react-router-dom";

const formatTenure = (timeSinceStart: string | undefined): string => {
  if (!timeSinceStart) return "-";
  return timeSinceStart
    .replace(/\s*years?/gi, "y")
    .replace(/\s*months?/gi, "m")
    .replace(/,\s*/g, " ");
};

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
    title: "Education Level Achieved",
    customSections: ["educationSection"],
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
  const { data: employees, filterValues, setFilters } = useListContext();

  const cityChoices = React.useMemo(() => {
    if (!employees) return [];
    const uniqueCities = [...new Set(employees.map((emp: any) => emp.city).filter(Boolean))];
    return uniqueCities.map((city: string) => ({ id: city, name: city }));
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


export const EmployeeList = () => {
  return (
    <List
      aside={<FilterSidebar />}
      sort={{ field: "internalId", order: "ASC" }}
      component="div"
      actions={false}
      exporter={false}
    >
      <EmployeeInformation />
    </List>
  );
};

const EmployeeInformation = () => {
  const { data, isLoading } = useListContext();
  const [locale] = useLocaleState();

  if (isLoading) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: 0 }}>
      {(data || []).map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Grid xs={2} item>
            <Card>
              <CardActionArea
                component={Link}
                to={`${record.id}/show`}
                style={{ textDecoration: "none" }}
              >
                <CardContent sx={{ padding: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <Box sx={{ position: "relative", flexShrink: 0 }}>
                      <Avatar
                        alt="Employee"
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: COLOR_BG[
                            `${record.internalId}`.charAt(
                              `${record.internalId}`.length - 1
                            ) as keyof typeof COLOR_BG
                          ] as string,
                          fontSize: 20,
                        }}
                      >
                        {`${record.firstName}`.charAt(0)}
                        {`${record.lastName}`.charAt(0)}
                      </Avatar>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 1,
                          right: 1,
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          bgcolor: record.active !== false ? "#4caf50" : "#9e9e9e",
                          border: "2px solid white",
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="h6" fontWeight={700} noWrap>
                        {record.firstName} {record.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {record.internalId}{record.state ? ` · ${record.state}` : ""}
                        {" · "}
                        <ReferenceField source="countryId" reference="countries" link={false}>
                          <TextField source="name" />
                        </ReferenceField>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                        Rate
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700}>
                        ${record.rate || 0}/h
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                        Salary
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700}>
                        ${(record.salary || 0).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                        Margin
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        sx={{ color: record.margin != null ? (record.margin >= 30 ? "#4caf50" : "#f44336") : "inherit" }}
                      >
                        {record.margin != null ? `${record.margin}%` : "-"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600, display: "block" }}>
                        Tenure
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {formatTenure(record.timeSinceStart)}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} noWrap>
                      {record.client || "-"}
                      {record.project ? ` / ${record.project}` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {record.role || "-"}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ mt: 0.5 }}>
                      Vacations: {record.availableDays ?? 0} days
                    </Typography>
                    {record.nearestPto && (
                      <Typography variant="body2" color="text.secondary" noWrap>
                        Next PTO: <DateField source="nearestPto" locales={locale} />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center" }}>
                <ShowButton />
                {HasPermissions("employees", "update") && <EditButton />}
              </CardActions>
            </Card>
          </Grid>
        </RecordContextProvider>
      ))}
    </Grid>
  );
};

export const EmployeeEdit = () => (
  <EditForm formData={formData} title="Employees" resource="employees" />
);

export const EmployeeCreate = () => (
  <CreateForm formData={formData} title="Employees" resource="employees" />
);

export const FilterSidebar = () => {
  return (
    <Card sx={{ order: -1, mr: 2, mt: 2, width: 250, maxWidth: 250, minWidth: 250 }}>
      <CardContent>
        <FilterLiveSearch />
        <ClientsFilter />
        <CountryFilter />
        <CityFilter />
        <ActiveFilter />
      </CardContent>
      {HasPermissions("employees", "create") && (
        <CardActions sx={{ px: 2, pb: 2 }}>
          <CreateButton fullWidth variant="contained" />
        </CardActions>
      )}
    </Card>
  );
};