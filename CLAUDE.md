# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` or `yarn start`: Start development server (runs on http://localhost:3000)
- `npm run build` or `yarn build`: Build for production
- `npm test` or `yarn test`: Run tests in interactive watch mode
- `npm run ts-check` or `yarn ts-check`: TypeScript type checking without emitting files

### Code Quality
- Prettier is configured with specific settings: trailing commas (es5), 2-space tabs, semicolons, double quotes
- ESLint extends react-app configuration
- TypeScript strict mode is enabled

## Project Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Admin Framework**: React Admin 5.x with Material-UI components
- **State Management**: React Query for server state
- **UI Components**: Material-UI (@mui/material), RSuite components
- **Data Provider**: ra-data-simple-rest for REST API integration
- **Authentication**: Custom JWT-based auth provider with localStorage persistence

### Core Architecture Patterns

#### Resource-Based Architecture
The application follows React Admin's resource-based pattern where each business entity is defined as a resource in `src/resources.ts`. The `resourceMap` array defines all available resources with their corresponding CRUD components:

- **Entities**: employees, projects, clients, companies, contracts, assignments, reports, etc.
- **Components**: Each resource has list, edit, create, and show components
- **Permissions**: Resources are filtered based on user permissions using `HasPermissions` helper

#### Configuration Management
- **Environment-aware config**: `src/config.ts` handles both local development (.env.local) and Docker environments
- **Runtime config**: Uses `window._env_` for Docker deployments to inject environment variables at runtime
- **API endpoints**: Separate configuration for employees API and user authentication API

#### Authentication Flow
- **Token-based**: JWT tokens stored in localStorage with expiration tracking
- **URL-based login**: Tokens can be passed via URL parameters and stored automatically
- **Permission system**: Dynamic menu and permission loading from backend configuration
- **Auto-redirect**: Expired tokens automatically redirect to login URL

### Directory Structure

#### `/src` - Main source directory
- **Root level**: Resource components (employees.tsx, projects.tsx, etc.) and main app files
- **`/components`**: Reusable UI components organized by type (buttons, fields, filters, forms, layout)
- **`/types`**: TypeScript type definitions for business entities
- **`/utils`**: Utility functions and helpers

#### Key Files
- **`App.tsx`**: Main application setup with React Admin configuration, data provider, and auth provider
- **`resources.ts`**: Central resource mapping with permissions and component definitions
- **`authProvider.ts`**: Authentication logic with token management and permission handling
- **`config.ts`**: Environment-specific configuration management

### Data Flow
1. **Authentication**: Token-based auth with automatic expiration handling
2. **API Integration**: REST API calls through configured data provider with Bearer token headers
3. **Permission Control**: Dynamic resource filtering based on user permissions
4. **State Management**: React Query for server state, localStorage for auth/config persistence

### Component Patterns
- Each resource typically has 4 components: List, Edit, Create, and Show/View
- Components use React Admin hooks and UI components
- Custom layouts and headers are defined in `src/components/layout/`
- Reports are read-only resources with specialized list components

### Environment Configuration
- **Local development**: Uses `.env.local` file
- **Docker deployment**: Uses runtime environment variables injected via `window._env_`
- **API endpoints**: Configurable for employees service and user authentication service

## Main Branch Information
- The main development branch is `main`
- Use `main` as the base branch for pull requests