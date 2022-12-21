import * as React from "react";
import {
  DateField,
  List,
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  SimpleShowLayout,
  FunctionField,
  RecordContextProvider,
} from "react-admin";
import {
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  ShowButton,
  EditButton,
} from "react-admin";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import { Avatar, Box, Divider, Grid } from "@mui/material";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";

const formData = [
  {
    title: "Personal Information",
    inputsList: [
      { name: "firstName", type: "string" },
      { name: "lastName", type: "string" },
      { name: "email", type: "string" },
      { name: "phone", type: "string" },
      { name: "birthDate", type: "date" },
      { name: "taxId", type: "string" },
      { name: "personalNumber", type: "string" },
      { name: "internalId", type: "string" },
    ],
    referenceValues: {
      source: "profile",
      reference: "roles",
      optionText: "name",
      multiselect: true,
    },
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
      { name: "emergencyContactFullName", type: "string" },
      { name: "emergencyContactPhone", type: "string" },
    ],
  },
];

export const EmployeeList = () => (
  <List
    sort={{ field: "internalId", order: "ASC" }}
    perPage={20}
    pagination={false}
    component="div"
    actions={false}
  >
    <TopToolbar sx={{ minHeight: { sm: 56 } }}>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
    <EmployeeCards />
  </List>
);

const EmployeeCards = () => {
  const { data, isLoading } = useListContext();
  if (isLoading) {
    return null;
  }
  return (
    <Grid container spacing={1} sx={{ marginTop: "1em" }}>
      {data.map((record) => (
        <RecordContextProvider key={record.internalId} value={record}>
          <Grid xs={2} item>
            <Card sx={{ maxWidth: 300 }}>
              {/*Profile image hardcoded until photo upload feature is in palce*/}
              <CardMedia
                component="img"
                height="200"
                image="https://entropay-assets.s3.amazonaws.com/messi.jpg"
              />

              <CardContent sx={{ padding: 1 }}>
                <Typography variant="h5" component="h5" align="center">
                  {`${record.firstName} ${record.lastName} (${record.internalId})`}
                </Typography>
                <Typography align="center">{record.personalEmail}</Typography>
                <CardActions>
                  <ShowButton />
                  <EditButton />
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </RecordContextProvider>
      ))}
    </Grid>
  );
};

export const EmployeeEdit = () => (
    <EditForm formData={formData} title="Employees" />
  );

export const EmployeeCreate = () => (
  <CreateForm formData={formData} title="Employees" />
);

export const EmployeeProfile = () => (
  <Show title="Show employee" emptyWhileLoading>
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item>
        <Box m={2}>
          {/*Profile image hardcoded until photo upload feature is in palce*/}
          <Avatar
            alt="Employee"
            src="https://entropay-assets.s3.amazonaws.com/messi.jpg"
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      </Grid>
      <Grid item>
        <SimpleShowLayout divider={<Divider flexItem />}>
          <FunctionField
            label=""
            render={(record) => `${record.firstName} ${record.lastName}`}
          />
          <TextField label="" source="personalEmail" />
        </SimpleShowLayout>
      </Grid>
      <Grid item>
        <SimpleShowLayout divider={<Divider flexItem />}>
          <TextField label="Current assigment" source="" />
          <DateField label="Hired Date" source="" />
        </SimpleShowLayout>
      </Grid>
    </Grid>
    <TabbedShowLayout>
      <Tab label="Personal and financial information">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <SimpleShowLayout divider={<Divider flexItem />}>
            <TextField source="taxId" />
            <TextField source="phone" />
            <TextField source="address" />
            <TextField source="city" />
          </SimpleShowLayout>
          <SimpleShowLayout divider={<Divider flexItem />}>
            <TextField source="state" />
            <TextField source="zip" />
            <TextField source="country" />
            <DateField source="birthDate" />
          </SimpleShowLayout>
        </Grid>
      </Tab>
      <Tab label="Contracts"></Tab>
      <Tab label="Assigments"></Tab>
      <Tab label="Vacations and Licencies"></Tab>
      <Tab label="Documents"></Tab>
    </TabbedShowLayout>
  </Show>
);
