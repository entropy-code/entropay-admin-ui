import * as React from "react";
import {
  Datagrid,
  DateField,
  List,
  TextField,
  RecordContextProvider,
  ShowButton,
  EditButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  useListContext,
  SearchInput,
} from "react-admin";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  
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
  orange
} from '@mui/material/colors';
import { Avatar, Box, Grid } from "@mui/material";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { HasPermissions } from "./components/layout/CustomActions";
import RowRadioButtonGroup from "./components/buttons/RowRadioButtonGroup";
import { useState } from "react";
import { Link } from "react-router-dom";

const COLOR_BG = [red[500], blueGrey[500], pink[500], deepPurple[500], 
                  indigo[500], blue[500], cyan[500], teal[500], green[500], 
                  orange[500]]

const formData = [
  {
    title: "Personal Information",
    inputsList: [
      { name: "internalId", type: "string", required: true },
      {}, // a blank space
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
      { name: "country", type: "string" },
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
    customSections: ["paymentInformationSection", "notesSection"],
  },
];

const employeeFilters = [<SearchInput source="q" alwaysOn />];

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
      actions={false}
      filters={employeeFilters}
    >
      <>
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
      </>
    </List>
  );
};

const EmployeeInformation = ({ renderAs = "list" }) => {
  const { data, isLoading } = useListContext();
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
              <CardActionArea component={Link} to={`${record.id}` + "/show"} style={{ textDecoration: 'none' }}>
                <CardContent sx={{ padding: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                      alt="Employee"
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        bgcolor: COLOR_BG[`${record.internalId}`.charAt(`${record.internalId}`.length - 1)], 
                        fontSize: 50, 
                        margin: 2
                      }}
                    >{`${record.firstName}`.charAt(0)}{`${record.lastName}`.charAt(0)}
                    </Avatar>
                  </Box>
                  <Box sx={{ minHeight: 155}}>
                    <Typography noWrap variant="h5" component="h5" align="center">
                      {record.firstName} {record.lastName}
                    </Typography>
                    <Typography noWrap align="center">{record.personalEmail}</Typography>
                    <Typography noWrap align="center"><DateField source="startDate"/></Typography>
                    <Typography noWrap align="center">{record.state} / {record.country}</Typography>
                    <Typography noWrap align="center">{record.client} / {record.project}</Typography>
                    <Typography noWrap align="center">{record.role}</Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <ShowButton />
                {HasPermissions("employees", "update") && <EditButton />}
              </CardActions>
            </Card>
          </Grid>
        </RecordContextProvider>
      ))}
    </Grid>
    );
  } else {
    return (
      <Datagrid rowClick="edit">
        <TextField source="internalId" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="personalEmail" />
        <TextField source="startDate" />
        <TextField source="city" />
        <TextField source="country" />
        <TextField source="client" />
        <TextField source="project" />
        <TextField source="role" />
      </Datagrid>
    );
  }
};

export const EmployeeEdit = () => (
  <EditForm formData={formData} title="Employees" />
);

export const EmployeeCreate = () => (
  <CreateForm formData={formData} title="Employees" resource="employees" />
);
