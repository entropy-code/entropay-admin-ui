import * as React from "react";
import {
  Datagrid,
  DateField,
  List,
  TextField,
  Show,
  TabbedShowLayout,
  SimpleShowLayout,
  FunctionField,
  RecordContextProvider,
  ArrayField,
  ShowButton,
  EditButton,
  Tab,
  TopToolbar,
  CreateButton,
  ExportButton,
  useListContext,
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
import RedirectButton from "./components/RedirectButton";

const formData = [
  {
    title: "Personal Information",
    inputsList: [
      { name: "firstName", type: "string" },
      { name: "lastName", type: "string" },
      { name: "personalEmail", type: "string" },
      { name: "phoneNumber", type: "string" },
      { name: "mobileNumber", type: "string" },
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
      { name: "healthInsurance", type: "string" },
      { name: "emergencyContactFullName", type: "string" },
      { name: "emergencyContactPhone", type: "string" },
    ],
  },
  {
    customSections: ["paymentSection", "notesSection"],
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
  <CreateForm formData={formData} title="Employees" resource="employees"/>
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
            <TextField source="phoneNumber" />
            <TextField source="mobileNumber" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="notes" />
          </SimpleShowLayout>
          <SimpleShowLayout divider={<Divider flexItem />}>
            <TextField source="state" />
            <TextField source="zip" />
            <TextField source="country" />
            <DateField source="birthDate" />
            <TextField source="healthInsurance" />
          </SimpleShowLayout>
        </Grid>
        <ArrayField source="paymentInformation">
          <Datagrid>
            <TextField source="platform" />
            <TextField source="country" />
            <TextField source="cbu" label="Alias/CBU" />
          </Datagrid>
        </ArrayField>
      </Tab>
      <Tab label="Contracts">
        <RedirectButton form="create" resource="contracts" text="New Contract"/>
      </Tab>
      <Tab label="Assigments">
        <RedirectButton form="create" resource="assigments" text="New Assigment"/>
      </Tab>
      <Tab label="Vacations and Licencies"></Tab>
      <Tab label="Documents"></Tab>
    </TabbedShowLayout>
  </Show>
);
