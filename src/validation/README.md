# Validation

## Overview

The `validation` folder contains the form validation logic for the Dynamic Form Builder.

It separates validation rules from React UI components. `validateField` handles validation for an individual field, while `validateForm` coordinates validation across all configured fields and returns a collection of errors.

## How It Connects to Other Files

- `validateField.js` contains the field-level validation rules.
- `validateForm.js` imports and calls `validateField` for every field.
- `FormBuilder.jsx` calls `validateForm` when the form is submitted.
- The returned errors are stored in React state and passed to components such as `FormCanvas`, `FieldCard`, `DynamicField`, and `FormPreview` for display.

## Key Features

- Required-field validation.
- Custom validation messages.
- Text minimum and maximum length validation.
- Email format validation.
- Number validation with minimum and maximum values.
- File type validation.
- File size validation.
- Checkbox required validation.
- Centralized form-level validation.
- Returns validation errors without directly modifying React state.

## Important Functions and Signatures

### `validateField`

```js
validateField(field, value)
```

Validates a single field using its configuration and current value.

Returns:

- A string containing the validation error when invalid.
- `null` when the value is valid.

Supported validation includes:

- `required`
- Text `minLength` / `maxLength`
- Email format
- Number `min` / `max`
- File `acceptedTypes`
- File `maxSize`
- Custom error messages

The function first handles common required-field validation and then applies rules specific to the field type.

### `validateForm`

```js
validateForm(fields, formValues)
```

Validates all fields in the form.

It:

1. Iterates through the field configuration.
2. Gets the current value using the field ID.
3. Calls `validateField`.
4. Adds any returned error to the errors object.

Returns an object keyed by field ID:

```js
{
  "field-id-1": "Email must be a valid email address.",
  "field-id-2": "Resume is required."
}
```

An empty object means the form passed validation.

## Basic Execution Flow

```text
User submits form
        ↓
FormBuilder calls validateForm()
        ↓
validateForm loops through fields
        ↓
Gets formValues[field.id]
        ↓
validateField(field, value)
        ↓
Field-specific validation
        ↓
Error message or null
        ↓
Errors object
        ↓
FormBuilder stores errors in state
        ↓
DynamicField displays the relevant error
```

### Field-Level Flow

```text
Field configuration + current value
            ↓
       validateField()
            ↓
     Required validation
            ↓
      Type-specific rules
            ↓
     ┌───────────────┐
     ↓               ↓
  Invalid           Valid
     ↓               ↓
 error string       null
```

The validation layer is intentionally independent from React state and UI rendering, making the rules easier to maintain, test, and reuse.
