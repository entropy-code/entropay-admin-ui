import { ClientList, ClientEdit, ClientCreate } from "./clients";
import { ProjectList, ProjectEdit, ProjectCreate } from "./projects";
import {
  ProjectTypeList,
  ProjectTypeEdit,
  ProjectTypeCreate,
} from "./projectTypes";
import { EmployeeCreate, EmployeeEdit, EmployeeList } from "./employees";
import { EmployeeProfile } from "./employeeProfiles";
import { CompanyList, CompanyEdit, CompanyCreate } from "./company";
import {
  ContractList,
  ContractEdit,
  ContractCreate,
  ContractView,
} from "./contracts";
import { SeniorityList, SeniorityEdit, SeniorityCreate } from "./seniorities";
import { RolesList, RolesEdit, RolesCreate } from "./roles";
import {
  AssignmentList,
  AssignmentEdit,
  AssignmentCreate,
  AssignmentView,
} from "./assignments";
import {
  TechnologiesList,
  TechnologiesEdit,
  TechnologiesCreate,
} from "./technologies";
import { EndReasonsList, EndReasonsEdit, EndReasonsCreate } from "./endReasons";
import { ListGuesser } from "react-admin";
import { LeaveTypeCreate, LeaveTypeEdit, LeaveTypeList } from "./leaveTypes";
import { HolidayCreate, HolidayEdit, HolidayList } from "./holidays";
import { CountryCreate, CountryEdit, CountryList } from "./countries";
import { VacationCreate, VacationEdit, VacationList } from "./vacations";
import { PtoCreate, PtoEdit, PtoList } from "./ptos";
import { EmployeeReportList } from "./employeesReport";
import { SalariesReportList } from "./salaryReport";
import { BillingReportList} from "./billingReport";
import { MarginReportList} from "./marginReport";
import { TurnoverReportList} from "./turnoverReport";
import { PtosReport } from "./employeesPtosReport";
import { OvertimeCreate, OvertimeEdit, OvertimeList, OvertimeView } from "./overtimes";
import { EmployeeFeedbackList, EmployeeFeedbackEdit, EmployeeFeedbackCreate } from "./employeeFeedback";
import { ClientFeedbackList, ClientFeedbackEdit, ClientFeedbackCreate } from "./clientFeedback";
import { ReimbursementCategoriesList, ReimbursementCategoriesEdit, ReimbursementCategoriesCreate } from "./reimbursementCategories";
import { ReimbursementsList, ReimbursementsEdit, ReimbursementsCreate } from "./reimbursements";

type Resource =
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | undefined;

export const resourceMap: {
  entity: string;
  list?: Resource;
  edit?: Resource;
  create?: Resource;
  show?: Resource;
  recordRepresentation?: (record: any) => string;
}[] = [
  {
    entity: "employees",
    list: EmployeeList,
    edit: EmployeeEdit,
    create: EmployeeCreate,
    show: EmployeeProfile,
    recordRepresentation: (record: { firstName: string; lastName: string }) =>
      `${record.firstName} ${record.lastName}`,
  },
  {
    entity: "feedback/employee",
    list: EmployeeFeedbackList,
    edit: EmployeeFeedbackEdit,
    create: EmployeeFeedbackCreate,
    show: undefined,
    recordRepresentation: (record: { title: string }) => `${record.title}`,
  },
  {
    entity: "feedback/client",
    list: ClientFeedbackList,
    edit: ClientFeedbackEdit,
    create: ClientFeedbackCreate,
    show: undefined,
    recordRepresentation: (record: { title: string }) => `${record.title}`,
  },
  {
    entity: "projects",
    list: ProjectList,
    edit: ProjectEdit,
    create: ProjectCreate,
    show: undefined,
    recordRepresentation: (record: { name: string }) => `${record.name}`,
  },
  {
    entity: "clients",
    list: ClientList,
    edit: ClientEdit,
    create: ClientCreate,
    show: undefined,
  },
  {
    entity: "companies",
    list: CompanyList,
    edit: CompanyEdit,
    create: CompanyCreate,
    show: undefined,
    recordRepresentation: (record: { name: string }) => `${record.name}`,
  },
  {
    entity: "tenants",
    list: ListGuesser,
    edit: undefined,
    create: undefined,
    show: undefined,
  },
  {
    entity: "project-types",
    list: ProjectTypeList,
    edit: ProjectTypeEdit,
    create: ProjectTypeCreate,
    show: undefined,
  },
  {
    entity: "contracts",
    list: ContractList,
    edit: ContractEdit,
    create: ContractCreate,
    show: ContractView,
  },
  {
    entity: "roles",
    list: RolesList,
    edit: RolesEdit,
    create: RolesCreate,
    show: undefined,
    recordRepresentation: (record: { name: string }) => `${record.name}`,
  },
  {
    entity: "seniorities",
    list: SeniorityList,
    edit: SeniorityEdit,
    create: SeniorityCreate,
    show: undefined,
    recordRepresentation: (record: { name: string }) => `${record.name}`,
  },
  {
    entity: "assignments",
    list: AssignmentList,
    edit: AssignmentEdit,
    create: AssignmentCreate,
    show: AssignmentView,
  },
  {
    entity: "technologies",
    list: TechnologiesList,
    edit: TechnologiesEdit,
    create: TechnologiesCreate,
    show: undefined,
  },
  {
    entity: "end-reasons",
    list: EndReasonsList,
    edit: EndReasonsEdit,
    create: EndReasonsCreate,
    show: undefined,
  },
  {
    entity: "leave-types",
    list: LeaveTypeList,
    edit: LeaveTypeEdit,
    create: LeaveTypeCreate,
    show: undefined,
  },
  {
    entity: "holidays",
    list: HolidayList,
    edit: HolidayEdit,
    create: HolidayCreate,
    show: undefined,
  },
  {
    entity: "countries",
    list: CountryList,
    edit: CountryEdit,
    create: CountryCreate,
    show: undefined,
  },
  {
    entity: "vacations",
    list: VacationList,
    edit: VacationEdit,
    create: VacationCreate,
    show: undefined,
  },
  {
    entity: "ptos",
    list: PtoList,
    edit: PtoEdit,
    create: PtoCreate,
    show: undefined,
  },
  {
    entity: "reports/employees",
    list: EmployeeReportList,
    edit: undefined,
    create: undefined,
    show: undefined,
  },
  {
    entity: "reports/ptos/employees",
    list: PtosReport,
    edit: undefined,
    create: undefined,
    show: undefined,
  },
  {
    entity: "reports/turnover/flat",
    list: TurnoverReportList,
    edit: undefined,
    create: undefined,
    show: undefined,
  },
  {
    entity: "reports/salaries",
    list: SalariesReportList,
    edit: undefined,
    show: undefined,
  },
  {
    entity: "reports/billing",
    list: BillingReportList,
    edit: undefined,
    show: undefined,
  },
  {
    entity: "reports/margin",
    list: MarginReportList,
    edit: undefined,
    show: undefined,
  },
  {
    entity: "overtimes",
    list: OvertimeList,
    edit: OvertimeEdit,
    create: OvertimeCreate,
    show: OvertimeView,
  },
  {
    entity: "reimbursement-categories",
    list: ReimbursementCategoriesList,
    edit: ReimbursementCategoriesEdit,
    create: ReimbursementCategoriesCreate,
    show: undefined,
    recordRepresentation: (record: { name: string }) => `${record.name}`,
  },
  {
    entity: "reimbursements",
    list: ReimbursementsList,
    edit: ReimbursementsEdit,
    create: ReimbursementsCreate,
    show: undefined,
  },
];
