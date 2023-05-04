import * as React from "react";
import {
  Datagrid,
  DateField,
  TextField,
  Show,
  TabbedShowLayout,
  SimpleShowLayout,
  FunctionField,
  ArrayField,
  EditButton,
  Tab,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ReferenceManyField,
  ReferenceField,
  NumberField,
  useGetRecordId,
  useLocaleState,
} from "react-admin";
import { Avatar, Box, Divider, Grid } from "@mui/material";
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

export const EmployeeProfile = () => {
  const [locale] = useLocaleState();
  return (
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
            <Grid item xs={6}>
              <SimpleShowLayout
                divider={<Divider flexItem />}
                sx={{
                  "& .RaSimpleShowLayout-row": {
                    minHeight: 65,
                    maxHeight: 65,
                    overflow: "auto",
                  },
                }}
              >
                <TextField source="internalId" label="Internal ID" />
                <ReferenceArrayField
                  label="Profile"
                  reference="roles"
                  source="profile"
                >
                  <SingleFieldList>
                    <ChipField source="name" />
                  </SingleFieldList>
                </ReferenceArrayField>
                <TextField source="phoneNumber" />
                <DateField source="birthDate" locales={locale} />
                <TextField source="taxId" />
                <TextField source="address" />
                <TextField source="city" />
                <TextField source="country" />
                <TextField source="notes" />
              </SimpleShowLayout>
            </Grid>

            <Grid item xs={6}>
              <SimpleShowLayout
                divider={<Divider flexItem />}
                sx={{
                  "& .RaSimpleShowLayout-row": {
                    minHeight: 65,
                  },
                }}
              >
                <ReferenceArrayField
                  label="Technologies"
                  reference="technologies"
                  source="technologies"
                >
                  <SingleFieldList>
                    <ChipField source="name" />
                  </SingleFieldList>
                </ReferenceArrayField>
                <TextField source="labourEmail" />
                <TextField source="mobileNumber" />
                <TextField source="personalNumber" />
                <TextField source="state" />
                <TextField source="zip" />
                <TextField source="emergencyContactFullName" />
                <TextField source="healthInsurance" />
                <TextField source="emergencyContactPhone" />
              </SimpleShowLayout>
            </Grid>
          </Grid>
          <ArrayField source="paymentInformation">
            <Datagrid
              bulkActionButtons={false}
              sx={{
                mb: 2,
              }}
            >
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
                source="employeeProfile"
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
              <DateField source="startDate" locales={locale} />
              <DateField source="endDate" locales={locale} />
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
                source="employeeProfile"
              />
            )}
            <Datagrid>
              <ReferenceField source="projectId" reference="projects">
                <TextField source="name" />
              </ReferenceField>
              <DateField source="startDate" locales={locale} />
              <DateField source="endDate" locales={locale} />
              <ReferenceField source="roleId" reference="roles">
                <ChipField source="name" />
              </ReferenceField>
              <NumberField source="hoursPerMonth" />
              <TextField source="billableRate" />
              <ReferenceField
                source="currency"
                reference="contracts/currencies"
              >
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
};
