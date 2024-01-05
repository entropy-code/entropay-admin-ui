import * as React from "react";
import { fetchUtils } from "ra-core";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import config from "./config";
import authProvider from "./authProvider";
import { CustomLayout } from "./components/layout/CustomLayout";
import { resourceMap } from "./resources";
import { HasPermissions } from "./components/layout/CustomActions";

console.log(config.env);

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const fetchResources = async () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return Promise.resolve(null);
  }

  await authProvider.getPermissions();
  return resourceMap.map((r, index) => (
    <Resource
      key={index}
      name={r["entity"]}
      list={HasPermissions(r["entity"], "read") ? r["list"] : null}
      edit={HasPermissions(r["entity"], "update") ? r["edit"] : null}
      create={HasPermissions(r["entity"], "create") ? r["create"] : null}
      show={HasPermissions(r["entity"], "read") ? r["show"] : null}
      recordRepresentation={r["recordRepresentation"]}
    />
  ));
};

const useCustomLocale = () => {
  const systemLocale = navigator.language;
  localStorage.setItem("RaStore.locale", systemLocale);
};

const dataProvider = simpleRestProvider(
  config.config.api.employees,
  httpClient,
  "X-Total-Count"
);

const App = () => {
  useCustomLocale();
  return (
    <Admin
      title="Entroteam"
      layout={CustomLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {fetchResources}
    </Admin>
  );
};

export default App;
