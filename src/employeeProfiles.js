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
  useGetManyReference,
  useGetOne,
  useLocaleState,
  useList,
  ListContextProvider,
} from "react-admin";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import RedirectButton from "./components/RedirectButton";
import { HasPermissions, ListActions } from "./components/layout/CustomActions";

const COLOR_green = "#efe";
const COLOR_white = "#white";

const activeValue = (record) => ({
  backgroundColor: record.active === true ? COLOR_green : COLOR_white,
});

const DisplayRecordCurrentId = () => {
  return useGetRecordId();
};

const GetActiveContract = () => {
  const employeeId = useGetRecordId();

  const { data } = useGetManyReference("contracts", {
    target: "employeeId",
    id: employeeId,
    filter: {
      active: true,
    },
  });

  const activeContract = React.useMemo(() => {
    if (Array.isArray(data)) {
      return data[0];
    }
    return undefined;
  }, [data]);

  return activeContract;
};

const GetVacationsAndAvailableDays = () => {
  const employeeId = useGetRecordId();
  const { data: vacationDetailData } = useGetManyReference("vacations", {
    target: "employeeId",
    id: employeeId,
  });

  let vacationAvailableDays = 0;
  if (vacationDetailData) {
    vacationDetailData.forEach((v) => {
      vacationAvailableDays += v.credit;
      vacationAvailableDays -= v.debit;
      v.remainingDays = v.credit - v.debit;
    });
  }
  
  return {
    vacationDetailData,
    vacationAvailableDays,
  };
};

const GetLatestAssignment = () => {
  const employeeId = useGetRecordId();

  const { data: employee } = useGetOne("employees", { id: employeeId });

  const { data: assignments } = useGetManyReference("assignments", {
    target: "employeeId",
    id: employeeId,
  });
  // It will be changed when the active field is added to assignments

  const latestAssignment = React.useMemo(() => {
    if (Array.isArray(assignments) && employee) {
      return assignments.find((a) => a.id === employee?.lastAssignmentId);
    }
    return undefined;
  }, [assignments, employee]);

  return latestAssignment;
};

const CustomEmpty = ({ message }) => <div>{message}</div>;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EmployeeProfile = () => {
  const [locale] = useLocaleState();
  const { vacationDetailData, vacationAvailableDays } = GetVacationsAndAvailableDays();
  const vacationDetailList = useList({ data: vacationDetailData });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                record={GetActiveContract()}
                source="employeeProfile"
              />
            )}
            <Datagrid rowStyle={activeValue}>
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
            label=""
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
                record={GetLatestAssignment()}
                source="employeeProfile"
              />
            )}
            <Datagrid rowStyle={activeValue}>
              <ReferenceField source="projectId" reference="projects">
                <TextField source="name" />
              </ReferenceField>
              <FunctionField
                label="Status"
                sortBy="active"
                sortByOrder="ASC"
                render={(record) =>
                  record.active === true ? "Active" : "Inactive"
                }
              />
              <ReferenceField
                source="projectId"
                reference="projects"
                label="Client"
              >
                <ReferenceField source="clientId" reference="clients">
                  <TextField source="name" />
                </ReferenceField>
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
        {HasPermissions("vacations", "create") && (
          <Tab label="Vacations">
            <RedirectButton
              form="create"
              resource="vacations"
              text="+ CREATE"
              label=""
              source="employeeProfile"
              recordId={DisplayRecordCurrentId()}
            />
            <ListContextProvider value={vacationDetailList}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Datagrid
                  bulkActionButtons={false}
                  empty={<CustomEmpty message="No vacations found" />}
                  size="medium"
                  sx={{
                    width: "30%",

                    "& .column-year": {
                      width: "50%",
                      textAlign: "left",
                    },
                    "& .column-remainingDays": {
                      width: "50%",
                      textAlign: "left",
                    },
                  }}
                >
                  <TextField source="year" label="Year" />
                  <TextField
                    source="remainingDays"
                    label="Remaining vacation days"
                  />
                </Datagrid>
              </div>
            </ListContextProvider>
            <Typography variant="h7" align="center">
              <Chip
                onClick={handleOpen}
                label={"Available days: " + vacationAvailableDays}
              />
              <Typography component="h3" align="center">
                <Modal open={open} onClose={handleClose}>
                  <Box sx={{ ...style, width: 400 }}>
                    <ReferenceManyField
                      reference="vacations"
                      target="employeeId"
                      sort={{ field: "year", order: "ASC" }}
                    >
                      {" "}
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        align="center"
                      >
                        Vacations details
                      </Typography>
                      <Datagrid
                        bulkActionButtons={false}
                        empty={<CustomEmpty message="No vacations found" />}
                      >
                        <TextField source="year" />
                        <NumberField source="credit" />
                        <NumberField source="debit" />
                        {HasPermissions("vacations", "update") && (
                          <EditButton />
                        )}
                      </Datagrid>
                    </ReferenceManyField>
                  </Box>
                </Modal>
              </Typography>
            </Typography>
          </Tab>
        )}
        {/*<Tab label="Documents"></Tab>
      Hidden empty tabs until developed
      */}
      </TabbedShowLayout>
    </Show>
  );
};
