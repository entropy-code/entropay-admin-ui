import {
  List,
  Datagrid,
  TextField,
  DateField,
  useLocaleState,
  NumberField,
  ArrayField,
  SingleFieldList,
  FunctionField,
  FilterButton,
  ExportButton,
} from "react-admin";
import { CustomizableChipField } from "./components/fields";
import { exporter } from "./utils/exporter";
import QuickFilter from "./components/filters/QuickFilter";

const headers = ['Internal ID', 'First Name', 'Last Name', 'Labour Email', 'Country', 'City', 'Role', 'Seniority', 
'Client', 'Project', 'Profile', 'Technologies', 'Contract Status', 'Start Date', 'End Date', 'USD Payment', 'ARS Payment']

const headersOrder = ['internalId', 'firstName', 'lastName', 'labourEmail', 'country', 'city', 'role', 'seniority', 'clientName',
'projectName', 'profile', 'technologiesNames', 'activeContract', 'startDate', 'endDate', 'usdPayment', 'arsPayment']

const reportFieldsList = [
  { name: "internalId", type: "number" },
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "labourEmail", type: "text" },
  { name: "country", type: "text" },
  { name: "city", type: "text" },
  { name: "role", type: "text" },
  { name: "seniority", type: "text" },
  { name: "clientName", type: "text" },
  { name: "projectName", type: "text" },
  { name: "profile", type: "text" },
  { name: "technologiesNames", type: "text" },
  { name: "activeContract", type: "text"},
  { name: "startDate", type: "date" },
  { name: "endDate", type: "date" },
  { name: "usdPayment", type: "number" },
  { name: "arsPayment", type: "number" },
];

const COLOR_GREEN = "#efe";
const COLOR_WHITE = "#white";

const activeValue = (record) => ({
  backgroundColor: record.activeContract === true ? COLOR_GREEN : COLOR_WHITE,
});

const employeeReportFilters = [
  <QuickFilter source="activeContract" label="Active Contract" defaultValue={true} />
];

export const EmployeeReportList = () => {
  const [locale] = useLocaleState();

  return (
    <List
      resource="reports/employees"
      exporter={exporter(reportFieldsList, "employeesReport", headers, headersOrder)}
      actions={<> <FilterButton /> <ExportButton/> </>}
      filters={employeeReportFilters}
      filterDefaultValues={{ active: true }}
    >
      <Datagrid
        rowStyle={activeValue}
        bulkActionButtons={false}
      >
        <TextField source="internalId" />
        <TextField source="firstName" />
        <TextField source="lastName" /> 
        <TextField source="labourEmail" />
        <TextField source="country" />
        <TextField source="city" />
        <TextField source="role" />
        <TextField source="seniority" />
        <TextField source="clientName" />
        <TextField source="projectName" />
        <ArrayField source="profile" label="Profile">
          <SingleFieldList>
            <CustomizableChipField>
              {(record) => {
                if (record) {
                  const profile = `${record}`;
                  return profile;
                }
              }}
            </CustomizableChipField>
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="technologiesNames" label="Technologies">
          <SingleFieldList>
            <CustomizableChipField>
              {(record) => {
                if (record) {
                  const technologiesNames = `${record}`;
                  return technologiesNames;
                }
              }}
            </CustomizableChipField>
          </SingleFieldList>
        </ArrayField>
        <FunctionField
                label="Contract status"
                render={(record) => record.activeContract ? "Active" : "Inactive"}
        />       
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <NumberField source="usdPayment" />
        <NumberField source="arsPayment" />
      </Datagrid>
    </List>
  );
};
