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
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ReferenceManyField,
  ReferenceField,
  NumberField,
  SearchInput,
  useGetRecordId,
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
import { HasPermissions, ListActions } from "./components/layout/CustomActions";

const COLOR_green = "#efe";
const COLOR_white = "#white";

const activeContractRowStyle = (record) => ({
  backgroundColor: record.active === true ? COLOR_green : COLOR_white,
});

const DisplayRecordCurrentId = () => {
  return useGetRecordId();
};

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

export const EmployeeList = () => (
  <List
    sort={{ field: "internalId", order: "ASC" }}
    component="div"
    actions={false}
    filters={employeeFilters}
  >
    <>
      <TopToolbar sx={{ minHeight: { sm: 56 } }}>
        <>
          {HasPermissions("employees", "create") && <CreateButton />}
          <ExportButton />
        </>
      </TopToolbar>
      <EmployeeCards />
    </>
  </List>
);

const EmployeeCards = () => {
  const { data, isLoading } = useListContext();
  if (isLoading) {
    return null;
  }
  return (
    <Grid container spacing={1} sx={{ marginTop: "1em" }}>
      {data.map((record, index) => (
        <RecordContextProvider key={index} value={record}>
          <Grid xs={2} item>
            <Card sx={{ maxWidth: 300 }}>
              {/*Profile image hardcoded until photo upload feature is in palce*/}
              <CardMedia
                component="img"
                height="200"
                image="https://entropay-assets.s3.us-east-1.amazonaws.com/default-profile.png"
              />

              <CardContent sx={{ padding: 1 }}>
                <Typography variant="h5" component="h5" align="center">
                  {`${record.firstName} ${record.lastName}`}
                </Typography>
                <Typography align="center">{record.personalEmail}</Typography>
                <CardActions>
                  <ShowButton />
                  {HasPermissions("employees", "update") && <EditButton />}
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
  <CreateForm formData={formData} title="Employees" resource="employees" />
);

export const EmployeeProfile = () => (
  <Show
    title="Show employee"
    actions={<ListActions entity={"employees"} />}
    emptyWhileLoading
  >
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
            src="https://entropay-assets.s3.amazonaws.com/default-profile.png"
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
      {/*
      <Grid item>
        <SimpleShowLayout divider={<Divider flexItem />}>
          <TextField label="Current assigment" source="" />
          <DateField label="Hired Date" source="" />
        </SimpleShowLayout>
      </Grid>
      Hidden empty fields until developed
      */}
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
            <TextField source="emergencyContactFullName" />
            <TextField source="emergencyContactPhone" />
            <TextField source="notes" />
          </SimpleShowLayout>
          <SimpleShowLayout divider={<Divider flexItem />}>
            <TextField source="state" />
            <TextField source="zip" />
            <TextField source="country" />
            <DateField source="birthDate" />
            <TextField source="personalNumber" />
            <TextField source="healthInsurance" />
            <ReferenceArrayField
              label="Profile"
              reference="roles"
              source="profile"
            >
              <SingleFieldList>
                <ChipField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceArrayField
              label="Technologies"
              reference="technologies"
              source="technologies"
            >
              <SingleFieldList>
                <ChipField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
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
        <ReferenceManyField
          label=""
          reference="contracts"
          target="employeeId"
          sort={{ field: "startDate", order: "DESC" }}
        >
          {HasPermissions("contracts", "create") && (
            <RedirectButton
              form="create"
              resource="contracts"
              text="+ CREATE"
              recordId={DisplayRecordCurrentId()}
            />
          )}
          <Datagrid rowStyle={activeContractRowStyle}>
            <ReferenceField
              source="contractType"
              reference="contracts/contract-types"
            >
              <ChipField source="value" />
            </ReferenceField>
            <FunctionField
              label="Status"
              sortBy="active"
              sortByOrder="ASC"
              render={(record) =>
                record.active === true ? "Active" : "Inactive"
              }
            />
            ;
            <ReferenceField source="companyId" reference="companies">
              <TextField source="name" />
            </ReferenceField>
            <DateField source="startDate" />
            <DateField source="endDate" />
            <ReferenceField source="roleId" reference="roles">
              <ChipField source="name" />
            </ReferenceField>
            <ReferenceField source="seniorityId" reference="seniorities">
              <ChipField source="name" />
            </ReferenceField>
            <NumberField source="hoursPerMonth" />
            <NumberField source="vacations" />
            <TextField source="benefits" />
            <TextField source="notes" />
            {HasPermissions("contracts", "update") && <EditButton />}
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Assigments">
        <ReferenceManyField
          label="Assignments"
          reference="assignments"
          target="employeeId"
          sort={{ field: "startDate", order: "DESC" }}
        >
          {HasPermissions("assignments", "create") && (
            <RedirectButton
              form="create"
              resource="assignments"
              text="+ CREATE"
              recordId={DisplayRecordCurrentId()}
            />
          )}
          <Datagrid>
            <ReferenceField source="projectId" reference="projects">
              <TextField source="name" />
            </ReferenceField>
            <DateField source="startDate" />
            <DateField source="endDate" />
            <ReferenceField source="roleId" reference="roles">
              <ChipField source="name" />
            </ReferenceField>
            <NumberField source="hoursPerMonth" />
            <TextField source="billableRate" />
            <ReferenceField source="currency" reference="contracts/currencies">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="labourHours" />
            <ReferenceField source="seniorityId" reference="seniorities">
              <ChipField source="name" />
            </ReferenceField>
            {HasPermissions("assignments", "update") && <EditButton />}
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      {/*<Tab label="Vacations and Licencies"></Tab>
      <Tab label="Documents"></Tab>
      Hidden empty tabs until developed
      */}
    </TabbedShowLayout>
  </Show>
);
