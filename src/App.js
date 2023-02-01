// in src/App.js
import * as React from "react";
import { fetchUtils } from 'ra-core';
import { Admin, Resource, ListGuesser} from 'react-admin';
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

import simpleRestProvider from 'ra-data-simple-rest';
import config from "./config";
import authProvider from "./authProvider";
import { CustomLayout } from './components/layout/CustomLayout';

console.log(config.env)

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(config.config.api.employees, httpClient, 'X-Total-Count');

const App = () => (
  <Admin title="Entroteam" layout={CustomLayout} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="employees" list={EmployeeList} edit={EmployeeEdit} create={EmployeeCreate} show={EmployeeProfile}/>
    <Resource name="projects" list={ProjectList} edit={ProjectEdit} create={ProjectCreate} />
    <Resource name="clients" list={ClientList} edit={ClientEdit} create={ClientCreate} />
    <Resource name="companies" list={CompanyList} edit={CompanyEdit} create={CompanyCreate} />
    <Resource name="tenants" list={ListGuesser} />
    <Resource name="project-types" list={ProjectTypeList} edit={ProjectTypeEdit} create={ProjectTypeCreate} />
    <Resource name="contracts" list={ContractList} edit={ContractEdit} create={ContractCreate} />
    <Resource name="roles" list={RolesList} edit={RolesEdit} create={RolesCreate} />
    <Resource name="seniorities" list={SeniorityList} edit={SeniorityEdit} create={SeniorityCreate} />
    <Resource name="assignments" list={AssignmentList} edit={AssignmentEdit} create={AssignmentCreate} />
    <Resource name="technologies" list={TechnologiesList} edit={TechnologiesEdit} create={TechnologiesCreate} />

  </Admin>
);

export default App;
