import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useLocaleState,
  WrapperField,
  FunctionField,
  useGetList,
  Filter,
  SelectInput,
} from "react-admin";
import CreateForm from "./components/forms/CreateForm";
import EditForm from "./components/forms/EditForm";
import { IPto, IYear } from "./types";
import CancelPtoButton from "./components/buttons/CancelPtoButton";
import { exporter } from "./utils/exporter";


const formData = [
  {
    title: "Employee",
    inputsList: [
      {
        name: "Employee",
        type: "selectInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: null,
          multiselect: false,
          required: true,
        },
      },
    ],
  },
  {
    title: "LeaveType",
    inputsList: [
      {
        name: "Leave Type",
        type: "selectInput",
        referenceValues: {
          source: "leaveTypeId",
          reference: "leave-types",
          optionText: "name",
          multiselect: false,
          required: true,
        },
      },
      {},
      { name: "ptoStartDate", type: "date", required: true },
      { name: "ptoEndDate", type: "date", required: true },
      { name: "isHalfDay", type: "boolean", label: "Half day off" },
      {},
    ],
  },
  {
    title: "Details",
    inputsList: [{ name: "details", type: "string" }],
  },
];

const headersRename = ['Employee', 'Leave Type', 'Start Date', 'End Date', 'Status', 'Details', 'Days']

const headers = ['employeeFullName', 'leaveTypeName', 'ptoStartDate', 'ptoEndDate', 'status', 'details', 'days']
const YearOptions = () => {
  const { data: years } = useGetList<IYear>("ptos/years");
  return years?.map((year) => ({ id: year.id, name: year.year })) || [];
};

export const PtoList = () => {
  const [locale] = useLocaleState();
  const currentYear: number = new Date().getFullYear();
  const yearsByFilter = YearOptions();

  if (!currentYear || yearsByFilter.length === 0) {
    return <></>;
  }

  const PtoFilters = () => (
    <Filter>
      <SelectInput
        source="year"
        label="Year"
        emptyText="All years"
        choices={yearsByFilter}
        alwaysOn
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </Filter>
  );

  return (
    <List
      filters={PtoFilters()}
      filterDefaultValues={{ year: currentYear }}
      perPage={50}
      exporter={exporter("ptos", headers,  headersRename)}
    >
      <Datagrid>
        <ReferenceField source="employeeId" reference="employees">
          <WrapperField label="Full Name">
            <TextField source="firstName" /> <TextField source="lastName" />
          </WrapperField>
        </ReferenceField>
        <ReferenceField source="leaveTypeId" reference="leave-types">
          <WrapperField label="Leave Type">
            <TextField source="name" />
          </WrapperField>
        </ReferenceField>
        <DateField source="ptoStartDate" locales={locale} />
        <DateField source="ptoEndDate" locales={locale} />
        <TextField source="status" />
        <TextField source="details" />
        <NumberField source="days" />
        <FunctionField
          render={(record: IPto) => (
            <EditButton disabled={record.status === "CANCELLED"} />
          )}
        />
        <FunctionField
          render={(record: IPto) => (
            <CancelPtoButton id={record.id} record={record} />
          )}
        />
      </Datagrid>
    </List>
  );
};

export const PtoEdit = () => (
  <EditForm formData={formData} title="Pto" resource="ptos" />
);

export const PtoCreate = () => (
  <CreateForm formData={formData} title="Pto" resource="ptos" />
);
