# Dynamic Form Builder - Week 5 Assignment

## Overview

Dynamic Form Builder is a React application created as the Week 5 internship assignment.

The application allows users to dynamically build forms by adding different field types, configuring field properties and validation rules, previewing the generated form, validating user input, handling file uploads, and submitting the completed form.

The project is built using:

- React
- JavaScript
- Vite
- CSS
- Browser localStorage


## What Was Created

- Dynamic field creation
- Support for Text, Email, Number, Select, Checkbox, and File fields
- Field removal
- Field configuration and editing
- Required-field configuration
- Controlled form inputs
- File input handling using refs
- Form preview mode
- Form submission and validation feedback
- Form configuration persistence using localStorage
- Empty, validation-error, and success states


## Module Responsibilities

| Module | Responsibility |
|---|---|
| `main.jsx` | Entry point of the React application. Creates the React root, enables `StrictMode`, imports global styles, and renders `App`. |
| `App.jsx` | Top-level application component that renders the main `FormBuilder`. |
| `components/builder/` | Contains the builder interface and coordinates field creation, editing, removal, form configuration, and builder state. |
| `components/form/` | Contains reusable form-rendering components, including dynamic field rendering, file handling, and preview mode. |
| `utils/` | Provides field creation, initial-value helpers, and localStorage persistence utilities. |
| `validation/` | Contains field-level and form-level validation logic. |

Detailed documentation for each module is available in its respective `README.md`.


## Week 5 Concepts Used

### React Mental Model

The application follows React's declarative model where the UI is derived from the current state and props rather than being manually manipulated through the DOM.

### Component Tree

The application is organized into reusable parent-child components. `FormBuilder` acts as the main state-owning component while specialized child components handle individual responsibilities.

### Rendering and Re-rendering

Changes to field configuration, form values, selected fields, validation errors, or application mode cause React to calculate the updated UI.

### Reconciliation and Keys

Dynamic fields are rendered from the field configuration using stable field IDs as React keys. This allows React to maintain the identity of dynamic fields when fields are added or removed.

### Props

Data and callbacks are passed from parent components to children. Child components communicate user actions back to their parents through callback props.

### State

React state manages:

- Field configuration
- Selected field
- Form values
- Validation errors
- Builder/preview mode
- Submission state

### Batching and Functional State Updates

Functional state updates are used when the next state depends on the previous state, such as adding, removing, or updating fields and form values.

### Lifecycle

The application considers component mounting, updating, and unmounting when dealing with resources such as DOM references and effects.

### Controlled Components

Text, email, number, select, and checkbox inputs are controlled through React state, making React the source of truth for their values.

### Uncontrolled Components

The file input is handled differently because file inputs are not controlled through a normal React `value` prop. A ref is used when direct DOM access is required.

### useState

`useState` manages the application's reactive state, including fields, form values, validation errors, selected fields, mode, and submission status.

### useRef

`useRef` is used for direct access to the file input DOM element, allowing the selected file input to be cleared.

### useEffect

`useEffect` is used to synchronize the React field configuration with browser `localStorage`.

The detailed reasoning for `useEffect` usage is documented separately in the project's dedicated `useEffect` documentation.


## Local Setup

1. Clone the repository.
2. Install dependencies.

```bash
npm install
```

3. Start the development server.

```bash
npm run dev
```

4. Open the local URL provided by Vite.


## Demo

**Live Application:**  
[Open Dynamic Form Builder](https://arbaz-17.github.io/Dynamic-Form-Builder-Assignment/)
