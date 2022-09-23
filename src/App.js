// in src/App.js
import * as React from "react";
import { fetchUtils } from 'ra-core';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { ClientList, ClientEdit, ClientCreate } from "./clients";
import { ProjectList, ProjectEdit, ProjectCreate } from "./projects";
import { ProjectTypeList, ProjectTypeEdit, ProjectTypeCreate } from "./projectTypes";
import { EmployeeCreate, EmployeeEdit, EmployeeList } from "./employees";
import { CompanyList, CompanyEdit, CompanyCreate } from "./company";
import { ContractList, ContractEdit, ContractCreate } from "./contracts";
import Dashboard from "./Dashboard";
import simpleRestProvider from 'ra-data-simple-rest';
import config from "./config";

console.log(config.env)

const dataProvider = simpleRestProvider(config.config.api.employees, fetchUtils.fetchJson, 'X-Total-Count');

const App = () => (
  <Admin title="Entropay" dashboard={Dashboard} dataProvider={dataProvider} >
    <Resource name="employees" list={EmployeeList} edit={EmployeeEdit} create={EmployeeCreate} />
    <Resource name="projects" list={ProjectList} edit={ProjectEdit} create={ProjectCreate} />
    <Resource name="clients" list={ClientList} edit={ClientEdit} create={ClientCreate} />
    <Resource name="companies" list={CompanyList} edit={CompanyEdit} create={CompanyCreate} />
    <Resource name="tenants" list={ListGuesser} />
    <Resource name="project-types" list={ProjectTypeList} edit={ProjectTypeEdit} create={ProjectTypeCreate} />
    <Resource name="contracts" list={ContractList} edit={ContractEdit} create={ContractCreate} />
  </Admin>
);

export default App;