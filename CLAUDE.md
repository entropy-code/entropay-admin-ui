# CLAUDE.md — entropay-admin-ui

React Admin frontend for the Entroteam platform. This file covers everything specific to this repo. For cross-app context (auth flow, roles, how this app fits with `entropay-employees` and `entropay-users-auth`), see the **`entroteam` meta-repo**.

---

## Development commands

```bash
npm start         # Dev server on http://localhost:3000
npm run build     # Production build
npm test          # Tests, watch mode
npm run ts-check  # Typecheck without emit
```

### Code quality
- Prettier: trailing commas (es5), 2-space tabs, semicolons, double quotes.
- ESLint extends `react-app`.
- TypeScript **strict mode** is on.

---

## Stack

- React 18 + TypeScript.
- React Admin 5.x with Material-UI (`@mui/material`) and some RSuite components.
- React Query for server state (provided by React Admin).
- `ra-data-simple-rest` as the data provider, talking to `entropay-employees` over REST with JWT bearer.
- Custom auth provider with JWT + `localStorage` persistence.

---

## How the app is wired

- **`App.tsx`** — root React Admin setup: data provider, auth provider, layout, theme.
- **`resources.ts`** — the spine of the app. A single `resourceMap` array enumerates every business entity with its `list` / `edit` / `create` / `show` components and a `recordRepresentation`. Adding or removing a resource is a one-line edit here.
- **`authProvider.ts`** — JWT lifecycle: parse token from URL or `localStorage`, refresh, expire, and load per-user permissions from the backend.
- **`config.ts`** — environment-aware config. Locally reads `.env.local`; in Docker reads `window._env_` injected at container start (so the same image works across environments).
- **`/components`** — reusable UI primitives organized by kind (`buttons/`, `fields/`, `filters/`, `forms/`, `layout/`).
- **`/types`** — TypeScript types for business entities.
- **`/utils`** — helpers.

### Permissions
Resources are filtered with the `HasPermissions` helper. The set of permissions a user has is loaded by `authProvider` at login from the backend; the menu and the `<Resource>` declarations honor it. Roles are platform-wide (see meta-repo).

### Reports vs. CRUD
"Report" entities (paths under `reports/...`) are **read-only**: they expose only a `list` component, no edit/create/show. Treat them as views over backend aggregates.

---

## Business domain map

The current `resourceMap` (`src/resources.ts`) declares the following resources, grouped by area. Use this as the starting reference when asked to add or change a feature — the entity name in the table matches the API path the resource talks to.

### People
| Resource | Components | Notes |
|---|---|---|
| `employees` | List/Edit/Create/Show | Core entity; `Show` is the rich `EmployeeProfile` view |
| `feedback/employee` | List/Edit/Create | Feedback given to employees |
| `feedback/client` | List/Edit/Create | Feedback received from clients |
| `feedback-summary` | Show only | Aggregated view |

### Projects & commercial
| Resource | Components |
|---|---|
| `projects` | List/Edit/Create |
| `clients` | List/Edit/Create |
| `companies` | List/Edit/Create |
| `tenants` | List (Guesser) — placeholder |
| `project-types` | List/Edit/Create |
| `contracts` | List/Edit/Create/Show |
| `assignments` | List/Edit/Create/Show |
| `roles` | List/Edit/Create |
| `seniorities` | List/Edit/Create |

### Time off & labor
| Resource | Components |
|---|---|
| `vacations` | List/Edit/Create |
| `ptos` | List/Edit/Create |
| `overtimes` | List/Edit/Create/Show |
| `leave-types` | List/Edit/Create |
| `holidays` | List/Edit/Create |
| `end-reasons` | List/Edit/Create |

### Catalogs
| Resource | Components |
|---|---|
| `countries` | List/Edit/Create |
| `technologies` | List/Edit/Create |
| `skills` | List/Edit/Create |
| `education-levels` | List/Edit/Create |

### Benefits & reimbursements
| Resource | Components |
|---|---|
| `benefits` | List/Edit/Create |
| `reimbursement-categories` | List/Edit/Create |
| `reimbursements` | List/Edit/Create |

### Reports (read-only)
| Resource | Notes |
|---|---|
| `reports/employees` | Headcount / employee list reports |
| `reports/ptos/employees` | PTO balance per employee |
| `reports/turnover/flat` | Turnover, flat layout |
| `reports/salaries` | Salaries / payment settlement |
| `reports/billing` | Billing report |
| `reports/margin` | Margin report |

When adding a report, follow the existing read-only resource pattern: provide only `list`, point at a backend `reports/...` endpoint that already supports React Admin pagination.

---

## Adding a new resource (recipe)

1. **Create the resource file** at `src/<entityName>.tsx` exporting at minimum `XxxList`, plus `XxxEdit` / `XxxCreate` / `XxxShow` as needed. Follow the structure of an existing similar resource (e.g. `clients.tsx` for a simple CRUD, `employees.tsx` for a complex one with custom show, `salaryReport.tsx` for a read-only report).
2. **Register it** in `src/resources.ts`: import the components and add an entry to `resourceMap` with the API path as `entity` and a `recordRepresentation` if the record has a natural display string.
3. **Permissions**: confirm the backend exposes the resource for the relevant roles. The `HasPermissions` filter applied in `App.tsx` will hide it for users who lack access; nothing extra is required in the resource file.
4. **Types**: add a TypeScript type to `src/types/` if the entity has a non-trivial shape used in multiple places.
5. **Reusable UI**: prefer composing existing pieces from `src/components/` over hand-rolling — fields, filters, and form layouts are already standardized there.

---

## Environment configuration

- **Local**: `.env.local` provides API base URLs for `entropay-employees` and `entropay-users-auth`.
- **Docker**: at runtime, `window._env_` (injected by the entrypoint script) overrides build-time values so a single image deploys to multiple environments.
- The auth provider uses both endpoints: it bounces unauthenticated users to `users-auth` and reads/writes data via `employees`.

---

## Branch convention

- Default branch: `main`.
- PRs target `main`.
