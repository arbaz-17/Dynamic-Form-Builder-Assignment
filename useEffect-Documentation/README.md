# useEffect Documentation

## Overview

This document explains the `useEffect` used in the Dynamic Form Builder Week 5 assignment.

The application contains one `useEffect`, located in `FormBuilder.jsx`. Its responsibility is to synchronize the React field configuration with the browser's `localStorage`.

```js
useEffect(() => {
  saveFields(fields);
}, [fields]);
```

The effect is intentionally small because the assignment requires understanding when an effect is actually necessary rather than using `useEffect` for general application logic.

---

## The Effect

### Code

```js
useEffect(() => {
  saveFields(fields);
}, [fields]);
```

### Purpose

The purpose of this effect is:

> **Whenever the form field configuration changes, persist the latest configuration to `localStorage`.**

The React state is the source of truth:

```text
fields state
    ↓
React UI
```

The effect synchronizes that state with an external browser system:

```text
fields state
    ↓
useEffect
    ↓
localStorage
```

---

## Why Is `useEffect` Needed?

React's rendering system manages React state and UI.

`localStorage`, however, is a browser API outside React's state system.

Therefore, writing to `localStorage` is a synchronization operation between:

```text
React
  ↕
External browser system
```

This is an appropriate use case for `useEffect`.

The effect does not calculate UI, derive state, or respond directly to a user event. Instead, it keeps an external system synchronized with React state.

---

## Why Not Save to `localStorage` Inside Every Handler?

An alternative would be to manually call:

```js
saveFields(...)
```

inside every function that modifies `fields`, such as:

```text
handleAddField()
handleRemoveField()
handleSaveField()
```

This approach would work, but it creates duplicated synchronization logic.

For example:

```text
handleAddField()
    ↓
update fields
    ↓
save fields

handleRemoveField()
    ↓
update fields
    ↓
save fields

handleSaveField()
    ↓
update fields
    ↓
save fields
```

This becomes harder to maintain because every future way of changing `fields` would also need to remember to call `saveFields`.

Instead, the application uses:

```text
Any fields change
       ↓
React updates fields state
       ↓
useEffect runs
       ↓
saveFields(fields)
```

This centralizes persistence around the state that needs to be synchronized.

---

## Dependency Array

The effect uses:

```js
[fields]
```

as its dependency array.

This means the effect should re-run when the `fields` value changes.

### Why `fields`?

Because `fields` is the data being synchronized with `localStorage`.

If the field configuration changes because the user:

- Adds a field
- Removes a field
- Edits a field
- Changes field validation
- Changes Select options

then the latest configuration needs to be persisted.

Therefore:

```js
[fields]
```

is the correct dependency for this synchronization.

---

## What Happens During the Application Lifecycle?

### Initial Render

When `FormBuilder` initializes:

```js
const [fields, setFields] = useState(() => loadFields());
```

the application first attempts to load previously saved fields.

Then React renders the UI.

After rendering, the effect runs:

```js
useEffect(() => {
  saveFields(fields);
}, [fields]);
```

This ensures the current field configuration is synchronized with `localStorage`.

### Field Configuration Changes

Suppose the user adds a field:

```text
User clicks "+ Text"
        ↓
handleAddField()
        ↓
setFields(...)
        ↓
React schedules state update
        ↓
FormBuilder re-renders
        ↓
fields contains the new field
        ↓
useEffect runs
        ↓
saveFields(fields)
        ↓
localStorage updated
```

The same principle applies when fields are edited or removed.

---

## Why I Used This `useEffect` Example

This effect demonstrates the core React mental model learned during Week 5:

```text
React State
     ↓
useEffect
     ↓
External System
```

The effect exists because React needs to synchronize its state with something outside React.

It is not being used to:

- Force a re-render
- Calculate derived state
- Respond to a button click
- Replace an event handler
- Duplicate existing state
- Perform ordinary calculations

---