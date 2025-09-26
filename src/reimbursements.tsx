import * as React from "react";
import { 
  Datagrid, 
  List, 
  TextField, 
  EditButton, 
  NumberField, 
  DateField, 
  ReferenceField,
  useLocaleState,
  useDataProvider
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { exporter } from "./utils/exporter";

function disabledCheck(source: string) {
  return source === "employeeProfile";
}

const headers = [
  "employee.internalId",
  "employee.firstName",
  "employee.lastName", 
  "category.name",
  "amount",
  "date", 
  "comment",
];

const headersRename = [
  "Internal ID", 
  "First Name",
  "Last Name",
  "Category Name",
  "Amount",
  "Date",
  "Comment",
];

const formData = [
  {
    title: "Reimbursements",
    inputsList: [
      { 
        name: "Employee", 
        type: "selectInput", 
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: (record: any) => `${record.firstName} ${record.lastName}`,
          required: true,
          sortField: "firstName",
          sortOrder: "ASC" as const,
          disabledCheck: disabledCheck
        }
      },
      { 
        name: "categoryId", 
        type: "selectInput", 
        referenceValues: {
          source: "categoryId",
          reference: "reimbursement-categories",
          optionText: "name",
          required: true,
          sortField: "name",
          sortOrder: "ASC" as const
        }
      },
      { name: "amount", type: "number", required: true },
      { name: "date", type: "date", required: true, defaultValue: new Date().toISOString().split('T')[0] },
      { name: "comment", type: "string", required: false },
    ],
  },
];

export const ReimbursementsList = () => {
  const [locale] = useLocaleState();
  const dataProvider = useDataProvider();
  
  return (
    <List
      exporter={exporter("reimbursement", headers, headersRename, dataProvider)}
    >
      <Datagrid rowClick="edit">
        <ReferenceField source="employeeId" reference="employees" link={false}>
          <TextField source="firstName" />
        </ReferenceField>
        <ReferenceField source="categoryId" reference="reimbursement-categories" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
        <DateField source="date" locales={locale} />
        <TextField source="comment" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const ReimbursementsEdit = () => (
  <EditForm formData={formData} title="Reimbursements" resource="reimbursements" />
);

export const ReimbursementsCreate = () => (
  <CreateForm
    formData={formData}
    title="Reimbursements"
    resource="reimbursements"
  />
);