import {
  List,
  Datagrid,
  TextField,
  DateField,
  useLocaleState,
  NumberField,
  ArrayField,
  SingleFieldList,
} from "react-admin";
import { CustomizableChipField } from "./components/fields";
import { exporter } from "./utils/exporter";

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
  { name: "startDate", type: "date" },
  { name: "endDate", type: "date" },
  { name: "usdPayment", type: "number" },
  { name: "arsPayment", type: "number" },
];
export const EmployeeReportList = () => {
  const [locale] = useLocaleState();
  return (
    <List
      resource="reports/employees"
      exporter={exporter(reportFieldsList, "employeesReport")}
    >
      <Datagrid>
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
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <NumberField source="usdPayment" />
        <NumberField source="arsPayment" />
      </Datagrid>
    </List>
  );
};
