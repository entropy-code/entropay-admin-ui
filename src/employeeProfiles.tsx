import * as React from "react";
import {
  Datagrid,
  DateField,
  TextField,
  Show,
  ShowButton,
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
  WrapperField,
  useList,
  ListContextProvider,
  SelectField,
} from "react-admin";
import { feedbackSourceChoices } from "./employeeFeedback";
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
import {
  HasPermissions,
  EntityViewActions,
} from "./components/layout/CustomActions";
import CancelPtoButton from "./components/buttons/CancelPtoButton";
import { useTheme } from "@mui/material/styles";

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
    if (!Array.isArray(data) || data.length === 0) {
      return undefined;
    }

    const contract = data[0];

    return {
      companyId: contract.companyId,
      contractType: contract.contractType,
      startDate: contract.startDate,
      roleId: contract.roleId,
      seniorityId: contract.seniorityId,
      hoursPerMonth: contract.hoursPerMonth,
      benefits: contract.benefits,
    };
  }, [data]);

  return activeContract;
};

export const GetVacationsAndAvailableDays = (
  suggestId?: string | undefined
) => {
  const employeeId = useGetRecordId(suggestId);
  const { data: vacations } = useGetManyReference("vacations", {
    target: "employeeId",
    id: suggestId ? suggestId : employeeId,
  });

  let vacationAvailableDays = 0;
  const sumPerYear: Record<
    string,
    {
      remainingDays: number;
    }
  > = {};
  if (vacations) {
    for (const element of vacations) {
      vacationAvailableDays += element.credit;
      vacationAvailableDays -= element.debit;
      const { year, credit, debit } = element;
      if (!sumPerYear[year]) {
        sumPerYear[year] = { remainingDays: 0 };
      }
      sumPerYear[year].remainingDays += credit;
      sumPerYear[year].remainingDays -= debit || 0;
    }
  }

  const summary = Object.entries(sumPerYear).map(
    ([year, { remainingDays }]) => ({
      year,
      remainingDays,
    })
  );

  return {
    vacationSummary: summary,
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

const CustomEmpty = ({ message }: { message: string }) => <div>{message}</div>;

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

const styleForSpan = {
  display: "inline-flex",
  alignItems: "center",
  margin: "0 50%",
};

const styleForCenteringTextField = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const styleForCenteringTyphography = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const EmployeeProfile = () => {
  const { palette } = useTheme();
  const [locale] = useLocaleState();
  const { vacationSummary, vacationAvailableDays } =
    GetVacationsAndAvailableDays();
  const vacationSummaryList = useList({
    data: vacationSummary.map((v) => ({ ...v, id: v.year })),
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const COLOR_green = palette?.mode === "light" ? "#efe" : "#006d77"
  const COLOR_white = 'transparent'

  const activeValue = (record: { active: boolean }) => ({
    backgroundColor: record.active === true ? COLOR_green : COLOR_white,
  });

  return (
    <Show
      title="Show employee"
      actions={<EntityViewActions entity={"employees"} />}
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
            {/*Profile image hardcoded until photo upload feature is in place*/}
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
            <TextField label="" source="labourEmail" />
          </SimpleShowLayout>
        </Grid>
        <Grid item>
          <FunctionField
            label=""
            render={(record) => (
              <SimpleShowLayout divider={<Divider flexItem />}>
                {!record.startDate && (
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      Start Date
                    </Typography>
                    <span style={styleForSpan}> - </span>
                    <Typography variant="subtitle2" color="textSecondary">
                      End Date
                    </Typography>
                    <span style={styleForSpan}>-</span>
                  </>
                )}
                {record.startDate && (
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      Start Date
                    </Typography>
                    <DateField
                      label=""
                      source="startDate"
                      record={record}
                      locales={locale}
                    />
                  </>
                )}
                {record.startDate && !record.endDate && (
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      End Date
                    </Typography>
                    <span style={styleForSpan}> - </span>
                  </>
                )}
                {record.endDate && (
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      End Date
                    </Typography>
                    <DateField
                      label=""
                      source="endDate"
                      record={record}
                      locales={locale}
                    />
                  </>
                )}
              </SimpleShowLayout>
            )}
          />
        </Grid>
        <Grid item>
          <SimpleShowLayout divider={<Divider flexItem />}>
            <>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={styleForCenteringTyphography}
              >
                Available Vacation Days
              </Typography>
              <TextField
                label=""
                source="availableDays"
                textAlign="left"
                style={styleForCenteringTextField}
              />
            </>
            <>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                textAlign="right"
                style={styleForCenteringTyphography}
              >
                Since Start
              </Typography>
              <TextField
                label=""
                source="timeSinceStart"
                textAlign="left"
                style={styleForCenteringTextField}
              />
            </>
          </SimpleShowLayout>
        </Grid>
        <Grid item>
          {HasPermissions("employees", "update") && <EditButton />}
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
                <SelectField
                  source="gender"
                  choices={[
                    { id: "MALE", name: "Male" },
                    { id: "FEMALE", name: "Female" },
                    { id: "NON_BINARY", name: "Non Binary" },
                  ]}
                />
                <DateField source="birthDate" locales={locale} />
                <TextField source="taxId" />
                <TextField source="address" />
                <TextField source="city" />
                <ReferenceField
                  source="countryId"
                  reference="countries"
                  link="show"
                >
                  <TextField source="name" />
                </ReferenceField>
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
                <TextField source="personalEmail" />
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
              <TextField source="routingNumber" label="Routing number" />
            </Datagrid>
          </ArrayField>

          <ArrayField source="children">
            <Datagrid
              bulkActionButtons={false}
              sx={{
                mb: 2,
              }}
            >
              <TextField source="firstName" />
              <TextField source="lastName" />
              <SelectField
                source="gender"
                choices={[
                  { id: "MALE", name: "Male" },
                  { id: "FEMALE", name: "Female" },
                  { id: "NON_BINARY", name: "Non Binary" },
                ]}
              />
              <TextField source="birthDate" />
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
                recordId={DisplayRecordCurrentId() as string}
                record={GetActiveContract()}
                source="employeeProfile"
              />
            )}
            <Datagrid
              rowSx={activeValue}
              empty={<CustomEmpty message="No contracts found" />}
            >
              <ReferenceField
                source="contractType"
                reference="contracts/contract-types"
                link={false}
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
              <ReferenceField
                source="companyId"
                reference="companies"
                link={false}
              >
                <TextField source="name" />
              </ReferenceField>
              <DateField source="startDate" locales={locale} />
              <DateField source="endDate" locales={locale} />
              <ReferenceField source="roleId" reference="roles" link={false}>
                <ChipField source="name" />
              </ReferenceField>
              <ReferenceField
                source="seniorityId"
                reference="seniorities"
                link={false}
              >
                <ChipField source="name" />
              </ReferenceField>
              <NumberField source="hoursPerMonth" />
              <TextField source="benefits" />
              <TextField source="notes" />
              <ShowButton />
              {HasPermissions("contracts", "update") && <EditButton />}
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Assignments">
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
                recordId={DisplayRecordCurrentId() as string}
                record={GetLatestAssignment()}
                source="employeeProfile"
              />
            )}
            <Datagrid
              rowSx={activeValue}
              empty={<CustomEmpty message="No assignments found" />}
            >
              <ReferenceField
                source="projectId"
                reference="projects"
                link={false}
              >
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
                link={false}
              >
                <ReferenceField
                  source="clientId"
                  reference="clients"
                  link={false}
                >
                  <TextField source="name" />
                </ReferenceField>
              </ReferenceField>
              <DateField source="startDate" locales={locale} />
              <DateField source="endDate" locales={locale} />
              <ReferenceField source="roleId" reference="roles" link={false}>
                <ChipField source="name" />
              </ReferenceField>
              <ReferenceField
                source="seniorityId"
                reference="seniorities"
                link={false}
              >
                <ChipField source="name" />
              </ReferenceField>
              <NumberField source="hoursPerMonth" />
              <NumberField source="vacations" />
              <TextField source="benefits" />
              <TextField source="notes" />
              <ShowButton />
              {HasPermissions("assignments", "update") && <EditButton />}
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        {HasPermissions("vacations", "create") && (
          <Tab label="Vacations">
            <RedirectButton
              form="create"
              resource="vacations"
              text="+ CREATE"
              source="employeeProfile"
              recordId={DisplayRecordCurrentId() as string}
            />
            <ListContextProvider value={vacationSummaryList}>
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
            <Typography variant={undefined} align="center">
              <Chip
                onClick={handleOpen}
                label={"Available days: " + vacationAvailableDays}
              />
              <Typography component="h3" align="center">
                <Modal open={open} onClose={handleClose}>
                  <Box sx={{ ...style, width: 500 }}>
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
                        <TextField source="details"></TextField>
                        <FunctionField
                          label="Edit"
                          render={(record) =>
                            HasPermissions("vacations", "update") &&
                            record.credit > 0 && <EditButton />
                          }
                        />
                      </Datagrid>
                    </ReferenceManyField>
                  </Box>
                </Modal>
              </Typography>
            </Typography>
          </Tab>
        )}
        {HasPermissions("ptos", "create") && (
          <Tab label="Ptos">
            <ReferenceManyField
              label=""
              reference="ptos"
              target="employeeId"
              sort={{ field: "startDate", order: "DESC" }}
              filter={{ status: "APPROVED" }}
            >
              <RedirectButton
                form="create"
                resource="ptos"
                text="+ CREATE"
                source="employeeProfile"
                recordId={DisplayRecordCurrentId() as string}
              />
              <Datagrid
                bulkActionButtons={false}
                empty={<CustomEmpty message="No ptos found" />}
              >
                <ReferenceField
                  source="leaveTypeId"
                  reference="leave-types"
                  link={false}
                >
                  <WrapperField label="Leave Type">
                    <TextField source="name" />
                  </WrapperField>
                </ReferenceField>
                <DateField source="ptoStartDate" locales={locale} />
                <DateField source="ptoEndDate" locales={locale} />
                <TextField source="status" />
                <TextField source="details" />
                <NumberField source="days" />
                <NumberField source="labourHours" />
                {HasPermissions("ptos", "update") && (
                  <FunctionField
                    render={(record) => (
                      <EditButton disabled={record.status === "CANCELLED"} />
                    )}
                  />
                )}
                <FunctionField
                  render={(record) => (
                    <CancelPtoButton id={record.id} record={record} />
                  )}
                />
              </Datagrid>
            </ReferenceManyField>
          </Tab>
        )}
         {HasPermissions("overtimes", "create") && (
          <Tab label="Overtimes">
            <ReferenceManyField
              label=""
              reference="overtimes"
              target="employeeId"
              sort={{ field: "createdAt", order: "DESC" }}
            >
              <RedirectButton
                form="create"
                resource="overtimes"
                text="+ CREATE"
                source="employeeProfile"
                recordId={DisplayRecordCurrentId() as string}
              />
              <Datagrid
                bulkActionButtons={false}
                empty={<CustomEmpty message="No overtimes found" />}
              >
                <ReferenceField
                  source="assignmentId"
                  reference="assignments"
                  link={false}
                >
                  <ReferenceField
                    source="projectId"
                    reference="projects"
                    label="Project"
                  >
                    <WrapperField label="Project">
                      <TextField source="name" />
                    </WrapperField>
                  </ReferenceField>
                </ReferenceField>
                <DateField source="date" locales={locale} />
                <TextField source="description" 
                  style={{ display:'inline-block', maxWidth: '10em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'  }}/>
                <NumberField source="hours" />
                {HasPermissions("overtimes", "update") && (
                  <FunctionField
                    render={(record) => (
                      <EditButton disabled={record.deleted === true} />
                    )}
                  />
                )}
                <FunctionField
                  render={(record) => (
                    <CancelPtoButton id={record.id} record={record} />
                  )}
                />
              </Datagrid>
            </ReferenceManyField>
          </Tab>
        )}
        {HasPermissions("feedback/employee", "create") && (
          <Tab label="Feedback">
            <ReferenceManyField
              label=""
              reference="feedback/employee"
              target="employeeId"
              sort={{ field: "feedbackDate", order: "DESC" }}
            >
              <RedirectButton
                form="create"
                resource="feedback/employee"
                text="+ CREATE"
                source="employeeProfile"
                recordId={DisplayRecordCurrentId() as string}
              />
              <Datagrid
                bulkActionButtons={false}
                empty={<CustomEmpty message="No feedback found" />}
              >
                <DateField source="feedbackDate" locales={locale} />
                <TextField source="title" />
                <SelectField source="source" choices={feedbackSourceChoices} />
                {HasPermissions("feedback/employee", "update") && (
                  <FunctionField
                    render={(record) => (
                      <EditButton />
                    )}
                  />
                )}
              </Datagrid>
            </ReferenceManyField>
          </Tab>
        )}
        {/*<Tab label="Documents"></Tab>
      Hidden empty tabs until developed
      */}
      </TabbedShowLayout>
    </Show>
  );
};
