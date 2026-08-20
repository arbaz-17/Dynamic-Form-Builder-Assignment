# Source

## Source Structure

| Folder | Purpose | Documentation |
|---|---|---|
| `components/builder/` | Form builder UI, field management, and builder state coordination | [View README](./components/builder/README.md) |
| `components/form/` | Dynamic form rendering, file input, and preview functionality | [View README](./components/form/README.md) |
| `utils/` | Initial values, field helpers, and localStorage persistence | [View README](./utils/README.md) |
| `validation/` | Field-level and form-level validation logic | [View README](./validation/README.md) |

## Basic Application Flow

```text
main.jsx
   ↓
App.jsx
   ↓
FormBuilder
   ↓
Builder / Form Components
   ↓
Utils + Validation
```
