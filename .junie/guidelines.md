# Entropay Admin UI Development Guidelines

This document provides guidelines and information for developers working on the Entropay Admin UI project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (version compatible with React 18)
- Yarn package manager

### Setup
1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```

### Development Server
Start the development server:
```
yarn start
```
This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production
Create a production build:
```
yarn build
```
The build artifacts will be stored in the `build/` directory.

### TypeScript Type Checking
Run TypeScript type checking:
```
yarn ts-check
```

### Environment Configuration
The application uses environment variables for configuration. These can be set in:
- `.env` - Default environment variables
- `.env.local` - Local overrides (not committed to repository)

## Testing Information

### Testing Framework
The project uses Jest as the test runner and React Testing Library for component testing.

### Running Tests
Run all tests:
```
yarn test
```

Run tests in watch mode (recommended during development):
```
yarn test --watch
```

Run a specific test file:
```
yarn test path/to/test/file.test.tsx
```

### Writing Tests
Tests are typically placed in the same directory as the component they test, with a `.test.tsx` extension.

#### Example Test Structure
```typescript
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import YourComponent from "./YourComponent";

describe("YourComponent", () => {
  test("renders correctly", () => {
    render(<YourComponent />);
    // Assertions...
  });
  
  test("handles user interaction", () => {
    // Setup
    const handleClick = jest.fn();
    render(<YourComponent onClick={handleClick} />);
    
    // Interaction
    fireEvent.click(screen.getByRole("button"));
    
    // Assertions
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing React Admin Components
When testing components that rely on React Admin context:
1. Use the `TestContext` provider from React Admin
2. Mock any required providers (auth, data, etc.)

Example:
```typescript
import { TestContext } from 'react-admin';

test('your test', () => {
  render(
    <TestContext>
      <YourComponent />
    </TestContext>
  );
  // Assertions...
});
```

## Code Style and Development Practices

### Code Formatting
The project uses Prettier for code formatting with the following configuration:
- Double quotes for strings
- 2 spaces for indentation
- Semicolons at the end of statements
- ES5 trailing commas

### Component Structure
- Use functional components with hooks
- Use TypeScript interfaces for component props
- Follow the React Admin patterns for resource components

### File Organization
- Resource components are defined in the root of the `src` directory
- Shared components are in the `src/components` directory
- Utility functions are in the `src/utils` directory

### Authentication and Authorization
The application uses a custom auth provider defined in `authProvider.js`. Resource access is controlled by the `HasPermissions` component.

### Data Fetching
The application uses the Simple REST data provider from React Admin, configured with a custom HTTP client that adds authentication headers.

### Recommended Development Workflow
1. Create/modify components and their tests
2. Run tests to verify functionality
3. Use TypeScript type checking to catch type errors
4. Format code with Prettier before committing