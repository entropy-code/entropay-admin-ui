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
  FilterButton
} from "react-admin";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Chip,
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
import { Avatar, Box, Grid } from "@mui/material";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { HasPermissions } from "./components/layout/CustomActions";
import RowRadioButtonGroup from "./components/buttons/RowRadioButtonGroup";
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
      {}, // a blank space,
      {
        name: "Employee",
        type: "multiSelect",
        referenceValues: {
          source: "profile",
          reference: "roles",
          optionText: "name",
          multiselect: true,
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
    ],
  },
  {
    title: "Direction",
    inputsList: [
      { name: "address", type: "string" },
      { name: "state", type: "string" },
      { name: "city", type: "string" },
      { name: "zip", type: "string" },
      { name: "country", type: "string", required: true },
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
      "notesSection",
      "activeSection",
    ],
  },
];

const employeeFilters = [
  <SearchInput source="q" alwaysOn />,
  <QuickFilter source="active" label="Active" defaultValue={true} />,
];

const fieldsList = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "labourEmail", type: "text" },
  { name: "startDate", type: "date" },
  { name: "city", type: "text" },
  { name: "country", type: "text" },
  { name: "client", type: "text" },
  { name: "project", type: "text" },
  { name: "role", type: "text" },
  { name: "availableDays", type: "number", label: "Available vacations" },
  { name: "nearestPto", type: "date" },
];

const headers = ['First Name', 'Last Name', 'Labour Email', 'Start Date', 'City', 'Country', 'Client', 
'Project', 'Role', 'Available Vacation Days', 'Nearest PTO']

export const EmployeeList = () => {
  const [viewOptionValue, setRadioValue] = useState("card");

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  const viewOptions = [
    {
      id: 1,
      label: "Card",
      value: "card",
    },
    {
      id: 2,
      label: "List",
      value: "list",
    },
  ];

  return (
    <List
      sort={{ field: "internalId", order: "ASC" }}
      component="div"
      actions={<FilterButton />}
      filters={employeeFilters}
      exporter={exporter(fieldsList, "employees", headers)}
    >
      <TopToolbar
        sx={{
          minHeight: { sm: 56 },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <RowRadioButtonGroup
            title={"View mode"}
            value={viewOptionValue}
            handleChange={handleChange}
            options={viewOptions}
          />
        </Box>
        <Box>
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
      <Grid container spacing={2} sx={{ marginTop: "1em" }}>
        {data.map((record, index) => (
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
                          bgcolor:
                            COLOR_BG[
                              `${record.internalId}`.charAt(
                                `${record.internalId}`.length - 1
                              )
                            ],
                          fontSize: 50,
                          margin: 2,
                        }}
                      >
                        {`${record.firstName}`.charAt(0)}
                        {`${record.lastName}`.charAt(0)}
                      </Avatar>
                    </Box>
                    <Box sx={{ minHeight: 155 }}>
                      <Typography
                        noWrap
                        variant="h5"
                        component="h5"
                        align="center"
                      >
                        {record.firstName} {record.lastName}
                      </Typography>
                      <Typography noWrap align="center">
                        {record.labourEmail ? record.labourEmail : "-"}
                      </Typography>
                      <Typography noWrap align="center">
                        <DateField source="startDate" locales={locale} />
                      </Typography>
                      <Typography noWrap align="center">
                        {record.state} / {record.country}
                      </Typography>
                      <Typography noWrap align="center">
                        {record.client} / {record.project}
                      </Typography>
                      <Typography noWrap align="center">
                        {record.role}
                      </Typography>
                      <Typography variant="h7" component="h3" align="center">
                        <Chip
                          label={"Available vacations: " + record.availableDays}
                        />
                      </Typography>
                      <Typography variant="h7" component="h6" align="center">
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
      <ListBuilder
        fieldsList={fieldsList}
        locale={locale}
        hasShowButton={true}
        resource="employees"
      />
    );
  }
};

export const EmployeeEdit = () => (
  <EditForm formData={formData} title="Employees" resource="employees" />
);

export const EmployeeCreate = () => (
  <CreateForm formData={formData} title="Employees" resource="employees" />
);
