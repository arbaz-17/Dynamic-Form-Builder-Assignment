# Builder

## Overview

The `builder` folder contains the main UI and state-coordination components used to create and configure the dynamic form.

`FormBuilder` acts as the main container and owns the builder's shared state. The other components focus on specific builder responsibilities such as adding fields, displaying fields, editing field configuration, and removing fields.

## How It Connects to Other Files

- `FormBuilder.jsx` is the main parent component and connects the builder UI with the `utils`, `validation`, and `form` folders.
- `BuilderToolbar.jsx` sends field-type selections to `FormBuilder` through `onAddField`.
- `FormCanvas.jsx` receives the current fields and form state from `FormBuilder` and renders `FieldCard` components.
- `FieldCard.jsx` uses `DynamicField` from the `form` folder and provides Edit/Remove actions.
- `FieldEditor.jsx` edits a copy of the selected field configuration and sends the updated field back to `FormBuilder`.
- `FormBuilder.jsx` also switches between builder mode and `FormPreview` from the `form` folder.

## Key Features

### `FormBuilder`

- Owns the main builder state.
- Adds and removes dynamic fields.
- Tracks the selected field.
- Manages form values and validation errors.
- Opens and closes the field editor.
- Saves field configuration to localStorage through `useEffect`.
- Switches between builder and preview modes.
- Handles form validation and submission.

### `BuilderToolbar`

- Provides buttons for supported field types.
- Delegates field creation to the parent through `onAddField`.

### `FormCanvas`

- Displays all configured fields.
- Handles the empty-builder state.
- Passes field data and actions to each `FieldCard`.

### `FieldCard`

- Displays an individual field.
- Reuses `DynamicField` for actual field rendering.
- Provides Edit and Remove actions.
- Shows which field is currently selected for editing.

### `FieldEditor`

- Maintains a temporary draft of the selected field.
- Allows editing of labels, placeholders, required state, and type-specific validation.
- Supports adding, editing, and removing Select options.
- Saves changes only when the user submits the editor.
- Allows changes to be cancelled without modifying the original field.

## Important Functions and Signatures

### `FormBuilder`

```js
FormBuilder()
```

Main container component responsible for coordinating builder state and child components.

Important handlers:

```js
handleAddField(type)
handleRemoveField(fieldId)
handleEditField(fieldId)
handleFieldChange(fieldId, value)
handleSaveField(updatedField)
handleCloseEditor()
validateCurrentForm()
handlePreview()
handleBackToBuilder()
handleSubmit()
```

### `BuilderToolbar`

```js
BuilderToolbar({ onAddField })
```

Calls `onAddField` with the selected field type.

### `FormCanvas`

```js
FormCanvas({
  fields,
  formValues,
  errors,
  selectedFieldId,
  onChange,
  onRemoveField,
  onEditField
})
```

Renders the current collection of fields and passes the appropriate data and callbacks to each `FieldCard`.

### `FieldCard`

```js
FieldCard({
  field,
  value,
  error,
  onChange,
  onRemove,
  onEdit,
  isSelected
})
```

Represents one field in the builder canvas and connects field rendering with builder actions.

### `FieldEditor`

```js
FieldEditor({ field, onSave, onClose })
```

Edits the selected field through local draft state.

Important internal functions:

```js
handleChange(event)
handleValidationChange(event)
handleOptionChange(index, key, value)
handleAddOption()
handleRemoveOption(index)
handleSubmit(event)
```

## Basic Execution Flow

### Adding a Field

```text
User clicks field type
        ↓
BuilderToolbar
        ↓
onAddField(type)
        ↓
FormBuilder.handleAddField()
        ↓
createField(type)
        ↓
setFields()
        ↓
React re-renders
        ↓
New FieldCard appears
```

### Editing a Field

```text
User clicks Edit Field
        ↓
FormBuilder stores selectedFieldId
        ↓
Selected field is derived from fields
        ↓
FieldEditor receives field
        ↓
FieldEditor creates a local draft
        ↓
User changes configuration
        ↓
Save Changes
        ↓
onSave(draft)
        ↓
FormBuilder updates fields
        ↓
Editor closes
```

### Removing a Field

```text
User clicks Remove
        ↓
FormBuilder.handleRemoveField()
        ↓
Remove field from fields
        ↓
Remove related form value
        ↓
Remove related validation error
        ↓
Clear selection if necessary
        ↓
React re-renders
```

### Builder → Preview

```text
User clicks Preview
        ↓
Clear editor/errors/submission state
        ↓
Set mode = "preview"
        ↓
FormPreview renders
        ↓
DynamicField renders configured fields
```

`FormBuilder` therefore acts as the central state owner, while the other builder components remain focused on specific UI responsibilities.
