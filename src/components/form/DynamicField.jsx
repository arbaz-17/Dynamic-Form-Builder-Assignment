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
    if (!error) return null;
    return (
      <p id={`${field.id}-error`} role="alert" className="error-text">
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
    case "email":
    case "number":
      return (
        <div className="input-group">
          <label htmlFor={field.id}>{field.label}</label>
          <input
            id={field.id}
            type={field.type}
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
        <div className="input-group">
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
        <div className="checkbox-group">
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
        <div className="input-group">
          <label htmlFor={field.id}>{field.label}</label>
          <input
            ref={fileInputRef}
            id={field.id}
            type="file"
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.id}-error` : undefined}
            onChange={handleChange}
            className="file-input"
          />
          
          {value && (
            <div className="file-preview">
              <span className="file-name">Selected: {value.name}</span>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={handleClearFile}
              >
                Clear
              </button>
            </div>
          )}
          {renderError()}
        </div>
      );

    default:
      return null;
  }
}

export default DynamicField;