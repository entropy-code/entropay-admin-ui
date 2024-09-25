import * as React from "react";
import { fetchUtils } from "ra-core";
import { Admin, Resource, localStorageStore } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import config from "./config";
import authProvider from "./authProvider";
import { CustomLayout } from "./components/layout/CustomLayout";
import { resourceMap } from "./resources";
import { HasPermissions } from "./components/layout/CustomActions";
import { QueryClient } from "@tanstack/react-query";


console.log(config.env);

const STORE_VERSION = "1";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  // @ts-ignore
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
      list={HasPermissions(r["entity"], "read") ? r["list"] : undefined}
      edit={HasPermissions(r["entity"], "update") ? r["edit"] : undefined}
      create={HasPermissions(r["entity"], "create") ? r["create"] : undefined}
      show={HasPermissions(r["entity"], "read") ? r["show"] : undefined}
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useCustomLocale();
  return (
    <Admin
      title="Entroteam"
      layout={CustomLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      queryClient={queryClient}
      store={localStorageStore(STORE_VERSION)}
    >
      {fetchResources}
    </Admin>
  );
};

export default App;