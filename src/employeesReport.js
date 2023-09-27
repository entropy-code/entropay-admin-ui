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

export const EmployeeReportList = () => {
  const [locale] = useLocaleState();

  return (
    <List resource="reports/employees">
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
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <NumberField source="usdPayment" />
        <NumberField source="arsPayment" />
      </Datagrid>
    </List>
  );
};
