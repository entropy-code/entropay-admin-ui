import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useLocaleState,
  ReferenceArrayField,
  NumberField,
} from "react-admin";

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
        <TextField source="status" />
        <DateField source="startDate" locales={locale} />
        <DateField source="endDate" locales={locale} />
        <NumberField source="usdPayment" />
        <NumberField source="arsPayment" />
      </Datagrid>
    </List>
  );
};
