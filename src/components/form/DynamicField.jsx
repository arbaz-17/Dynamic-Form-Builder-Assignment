import { useRef } from "react";

function DynamicField({ field, value, error, onChange }) {
    const fileInputRef = useRef(null);
    
  function handleChange(event) {
    const { type, checked, value: inputValue } = event.target;

    if (type === "checkbox") {
      onChange(checked);
      return;
    }

    if (type === "file") {
      onChange(event.target.files?.[0] ?? null);
      return;
    }

    onChange(inputValue);
  }

  function renderError() {
    if (!error) {
      return null;
    }

    return (
      <p id={`${field.id}-error`} role="alert">
        {error}
      </p>
    );
  }

  function handleClearFile() {
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  onChange(null);
}

  switch (field.type) {
    case "text":
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>

          <input
            id={field.id}
            type="text"
            value={value}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.id}-error` : undefined}
            onChange={handleChange}
          />

          {renderError()}
        </div>
      );

    case "email":
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>

          <input
            id={field.id}
            type="email"
            value={value}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.id}-error` : undefined}
            onChange={handleChange}
          />

          {renderError()}
        </div>
      );

    case "number":
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>

          <input
            id={field.id}
            type="number"
            value={value}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.id}-error` : undefined}
            onChange={handleChange}
          />

          {renderError()}
        </div>
      );

    case "select":
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>

          <select
            id={field.id}
            value={value}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.id}-error` : undefined}
            onChange={handleChange}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {renderError()}
        </div>
      );

    case "checkbox":
      return (
        <div>
          <input
            id={field.id}
            type="checkbox"
            checked={value}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.id}-error` : undefined}
            onChange={handleChange}
          />

          <label htmlFor={field.id}>{field.label}</label>

          {renderError()}
        </div>
      );

case "file":
  return (
    <div>
      <label htmlFor={field.id}>
        {field.label}
      </label>

      <input
        ref={fileInputRef}
        id={field.id}
        type="file"
        required={field.required}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${field.id}-error`
            : undefined
        }
        onChange={handleChange}
      />

      {value && (
        <p>
          Selected file: {value.name}
        </p>
      )}

      {value && (
        <button
          type="button"
          onClick={handleClearFile}
        >
          Clear File
        </button>
      )}

      {renderError()}
    </div>
  );

    default:
      return null;
  }
}

export default DynamicField;
