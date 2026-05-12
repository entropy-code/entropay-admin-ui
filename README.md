# entropay-admin-ui

React Admin frontend for the Entroteam platform. Used by HR and Operations to manage employees, projects, contracts, time off, and reports.

- **Node 20**
- **React 18**
- **Port: 3000**

## Tech Stack

- React 18 + TypeScript
- React Admin 5.x with Material-UI
- `ra-data-simple-rest` data provider (talks to `entropay-employees` over REST with JWT bearer)
- Custom auth provider with JWT + `localStorage` persistence

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm start

# Run tests
npm test

# Type-check without emit
npm run ts-check
```

Or using the Makefile:

```bash
make setup   # Install dependencies
make run     # Run on http://localhost:3000
make test    # Run all tests
```

## Configuration

Create a `.env.local` file pointing at the local backends:

```
REACT_APP_EMPLOYEES_API_URL=http://localhost:8100
REACT_APP_AUTH_URL=http://localhost:8000
```

In Docker, `window._env_` is injected at container start so the same image deploys to multiple environments.
