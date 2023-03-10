import { ClientList, ClientEdit, ClientCreate } from "./clients";
import { ProjectList, ProjectEdit, ProjectCreate } from "./projects";
import { ProjectTypeList, ProjectTypeEdit, ProjectTypeCreate } from "./projectTypes";
import { EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeProfile } from "./employees";
import { CompanyList, CompanyEdit, CompanyCreate } from "./company";
import { ContractList, ContractEdit, ContractCreate } from "./contracts";
import { SeniorityList, SeniorityEdit, SeniorityCreate } from "./seniorities";
import { RolesList, RolesEdit, RolesCreate } from "./roles";
import { AssignmentList, AssignmentEdit, AssignmentCreate } from "./assignments";
import { TechnologiesList, TechnologiesEdit, TechnologiesCreate } from "./technologies";
import { ListGuesser } from 'react-admin';

export const resourceMap = [
    {
      entity: "employees", 
      list: EmployeeList,
      edit: EmployeeEdit,
      create: EmployeeCreate, 
      show: EmployeeProfile,
      recordRepresentation: (record) => `${record.firstName} ${record.lastName}`
    },
    {
      entity: "projects", 
      list: ProjectList, 
      edit: ProjectEdit, 
      create: ProjectCreate,
      show: null
    },
    {
      entity: "clients", 
      list: ClientList, 
      edit: ClientEdit, 
      create: ClientCreate,
      show: null
    },
    {
      entity: "companies",
      list: CompanyList,
      edit: CompanyEdit, 
      create: CompanyCreate,
      show: null
    },
    {
      entity: "tenants", 
      list: ListGuesser,
      edit: null, 
      create: null,
      show: null
    },
    {
      entity: "project-types",
      list: ProjectTypeList,
      edit: ProjectTypeEdit, 
      create: ProjectTypeCreate,
      show: null
    },
    {
      entity: "contracts",
      list: ContractList,
      edit: ContractEdit, 
      create: ContractCreate,
      show: null
    }, 
    {
      entity: "roles", 
      list: RolesList, 
      edit: RolesEdit,
      create: RolesCreate,
      show: null
    },
    {
      entity: "seniorities", 
      list: SeniorityList,
      edit: SeniorityEdit,
      create: SeniorityCreate,
      show: null
    },
    {
      entity: "assignments",
      list: AssignmentList, 
      edit: AssignmentEdit,
      create:AssignmentCreate,
      show: null
    },
    {
      entity: "technologies",
      list: TechnologiesList,
      edit: TechnologiesEdit, 
      create: TechnologiesCreate,
      show: null
    }
  ]
