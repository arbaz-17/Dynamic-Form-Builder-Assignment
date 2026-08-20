# Utils

## Overview

The `utils` folder contains small, reusable helper functions used by the Dynamic Form Builder. These utilities handle initial form values and persistence of the form field configuration in browser `localStorage`.

The utilities keep non-UI logic separate from React components.

## How It Connects to Other Files

- `getInitialValue.js` is used by `getInitialFormValues.js` to determine the correct initial value for each field type.
- `getInitialFormValues.js` is used by `FormBuilder.jsx` when the form needs to be reset/reinitialized.
- `storage.js` is used by `FormBuilder.jsx` to load saved fields when the application starts and save fields whenever the field configuration changes.
- These utilities do not render UI and do not directly depend on React components.

## Key Features

- Provides type-specific initial values for dynamic fields.
- Builds an initial values object for an entire field configuration.
- Persists field configuration using browser `localStorage`.
- Safely handles missing, invalid, or unreadable stored data.
- Keeps utility logic reusable and independent from UI components.

## Important Functions and Signatures

### `getInitialValue`

```js
getInitialValue(field)
```

Returns the appropriate initial value based on the field type.

| Field Type | Initial Value |
|---|---|
| `text` | `""` |
| `email` | `""` |
| `number` | `""` |
| `select` | `""` |
| `checkbox` | `false` |
| `file` | `null` |

Throws an error for unsupported field types.

### `getInitialFormValues`

```js
getInitialFormValues(fields)
```

Creates an object containing an initial value for every field, using the field ID as the key.


### `loadFields`

```js
loadFields()
```

Reads the saved field configuration from `localStorage`.

Returns:

- Parsed field array when valid data exists.
- `[]` when no data exists or the stored data is invalid.

### `saveFields`

```js
saveFields(fields)
```

Serializes the current field configuration and stores it in `localStorage`.

The storage key is:

```js
"dynamic-form-builder-fields"
```

## Basic Execution Flow

### Initial Form Values

```text
Field configuration
        ↓
getInitialFormValues(fields)
        ↓
getInitialValue(field)
        ↓
Type-specific initial value
        ↓
formValues object
```

### Loading Saved Fields

```text
Application starts
        ↓
FormBuilder initializes fields
        ↓
loadFields()
        ↓
localStorage
        ↓
Saved field configuration
```

### Saving Fields

```text
fields state changes
        ↓
FormBuilder useEffect
        ↓
saveFields(fields)
        ↓
JSON.stringify(fields)
        ↓
localStorage
```

The `storage.js` utilities therefore provide the bridge between React state and the browser's persistent storage.
