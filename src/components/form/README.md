# Form

## Overview

The `form` folder contains the reusable form-rendering components of the Dynamic Form Builder.

- `DynamicField.jsx` renders different field types dynamically from field configuration.
- `FormPreview.jsx` renders the complete generated form in preview mode and handles form submission/back navigation.

These components focus on rendering and user interaction while the parent `FormBuilder` owns the main form state and validation state.

## How It Connects to Other Files

- `DynamicField.jsx` receives field configuration, current value, error, and an `onChange` callback from parent components.
- `FormPreview.jsx` receives fields, values, errors, and callbacks from `FormBuilder.jsx`.

## Key Features

### `DynamicField`

- Dynamically renders supported field types.
- Supports controlled values for normal inputs.
- Handles checkbox boolean values.
- Extracts the selected `File` object from file inputs.
- Uses `useRef` to clear the file input.
- Displays validation errors.

### `FormPreview`

- Renders the complete form from the current field configuration.
- Reuses `DynamicField` instead of duplicating field rendering logic.
- Delegates submission handling to the parent.

## Important Functions and Signatures

### `DynamicField`

```js
DynamicField({ field, value, error, onChange })
```

Renders the appropriate input based on `field.type`.

Important internal functions:

```js
handleChange(event)
```

Normalizes input changes and sends the new value to the parent through `onChange`.

```js
renderError()
```

Renders the current validation error when one exists.

```js
handleClearFile()
```

Uses the file input ref to clear the DOM input and sends `null` to the parent form state.

### `FormPreview`

```js
FormPreview({
  fields,
  formValues,
  errors,
  onChange,
  onSubmit,
  onBack
})
```

Renders all configured fields and connects their interactions to the callbacks supplied by `FormBuilder`.

Internal function:

```js
handleSubmit(event)
```

Prevents the browser's default form submission and calls the parent `onSubmit` handler.

## Basic Execution Flow

### Dynamic Field Rendering

```text
Field configuration
        ↓
DynamicField
        ↓
field.type
        ↓
Select appropriate input
        ↓
Render current value
```

### User Input Flow

```text
User changes input
        ↓
DynamicField.handleChange()
        ↓
Normalize value
        ↓
onChange(value)
        ↓
FormBuilder updates formValues
        ↓
React re-renders
        ↓
DynamicField receives updated value
```

### File Input Flow

```text
User selects file
        ↓
event.target.files[0]
        ↓
File object
        ↓
onChange(file)
        ↓
FormBuilder stores file in formValues
```

When clearing:

```text
Clear button
    ↓
handleClearFile()
    ↓
fileInputRef.current.value = ""
    ↓
onChange(null)
    ↓
FormBuilder removes the file from form state
```

### Preview Submission Flow

```text
User clicks Submit
        ↓
FormPreview.handleSubmit()
        ↓
preventDefault()
        ↓
onSubmit()
        ↓
FormBuilder validates the form
        ↓
Success or validation errors
```

The `form` components therefore provide the UI and input interaction layer while state management and validation remain centralized in `FormBuilder` and the `validation` utilities.
