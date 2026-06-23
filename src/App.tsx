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
import { toIsoDate } from "./utils/workingDaysCalculator";

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
  await authProvider.checkAuth();
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

const baseDataProvider = simpleRestProvider(
  config.config.api.employees,
  httpClient,
  "X-Total-Count"
);

const normalizeCustomRange = (
  startDate?: string,
  endDate?: string,
): { dateFrom: string; dateTo: string } | null => {
  if (!startDate && !endDate) {
    return null;
  }

  if (startDate && !endDate) {
    return { dateFrom: startDate, dateTo: startDate };
  }

  if (!startDate && endDate) {
    return { dateFrom: endDate, dateTo: endDate };
  }

  if (!startDate || !endDate) {
    return null;
  }

  if (startDate <= endDate) {
    return { dateFrom: startDate, dateTo: endDate };
  }

  return { dateFrom: endDate, dateTo: startDate };
};

const getDateRangeByPeriod = (period?: string): { dateFrom: string; dateTo: string } | null => {
  if (!period) {
    return null;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  switch (period) {
    case "last_month": {
      const start = new Date(currentYear, currentMonth - 1, 1);
      const end = new Date(currentYear, currentMonth, 0);
      return { dateFrom: toIsoDate(start), dateTo: toIsoDate(end) };
    }
    case "this_month": {
      const start = new Date(currentYear, currentMonth, 1);
      const end = new Date(currentYear, currentMonth + 1, 0);
      return { dateFrom: toIsoDate(start), dateTo: toIsoDate(end) };
    }
    case "last_year": {
      const start = new Date(currentYear - 1, 0, 1);
      const end = new Date(currentYear - 1, 11, 31);
      return { dateFrom: toIsoDate(start), dateTo: toIsoDate(end) };
    }
    case "this_year": {
      const start = new Date(currentYear, 0, 1);
      const end = new Date(currentYear, 11, 31);
      return { dateFrom: toIsoDate(start), dateTo: toIsoDate(end) };
    }
    default:
      return null;
  }
};

const shouldApplyPeriodFilter = (resource: string): boolean => {
  return resource === "ptos" || resource.startsWith("reports/ptos/");
};

const dataProvider = new Proxy(baseDataProvider, {
  get: (target: any, prop: string | symbol) => {
    if (prop === "getList") {
      return (resource: string, params: any) => {
        if (shouldApplyPeriodFilter(resource) && params?.filter) {
          const sanitizedFilter = { ...params.filter };
          const selectedPeriod = sanitizedFilter.period;
          const isPtoListResource = resource === "ptos";
          const isShowingAllYears = sanitizedFilter.allYears === true;
          const rawDateFrom = sanitizedFilter.dateFrom;
          const rawDateTo = sanitizedFilter.dateTo;

          delete sanitizedFilter.period;
          delete sanitizedFilter.dateFrom;
          delete sanitizedFilter.dateTo;
          delete sanitizedFilter.allYears; // Remove allYears flag before sending to backend

          // Remove year filter if showing all years
          if (isShowingAllYears) {
            delete sanitizedFilter.year;
          } else if (!sanitizedFilter.year || sanitizedFilter.year === "") {
            // Remove empty year filter
            delete sanitizedFilter.year;
          }

          if (selectedPeriod === "custom") {
            const customRange = normalizeCustomRange(
              sanitizedFilter.startDate ?? rawDateFrom,
              sanitizedFilter.endDate ?? rawDateTo,
            );

            if (customRange) {
              sanitizedFilter.dateFrom = customRange.dateFrom;
              sanitizedFilter.dateTo = customRange.dateTo;

              if (isPtoListResource) {
                delete sanitizedFilter.year;
              }
            }
          } else if (selectedPeriod) {
            // Only apply period range if a period is selected
            const periodRange = getDateRangeByPeriod(selectedPeriod);
            if (periodRange) {
              sanitizedFilter.dateFrom = periodRange.dateFrom;
              sanitizedFilter.dateTo = periodRange.dateTo;

              if (isPtoListResource) {
                delete sanitizedFilter.year;
              }
            }
          } else {
            // Support direct dateFrom/dateTo filters when no period is selected.
            const directRange = normalizeCustomRange(rawDateFrom, rawDateTo);
            if (directRange) {
              sanitizedFilter.dateFrom = directRange.dateFrom;
              sanitizedFilter.dateTo = directRange.dateTo;
            }
          }

          delete sanitizedFilter.startDate;
          delete sanitizedFilter.endDate;

          // Remove any remaining empty parameters
          Object.keys(sanitizedFilter).forEach(key => {
            if (sanitizedFilter[key] === "" || sanitizedFilter[key] === null || sanitizedFilter[key] === undefined) {
              delete sanitizedFilter[key];
            }
          });

          return target.getList(resource, {
            ...params,
            filter: sanitizedFilter,
          });
        }

        return target.getList(resource, params);
      };
    }

    return (target as any)[prop];
  },
});

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