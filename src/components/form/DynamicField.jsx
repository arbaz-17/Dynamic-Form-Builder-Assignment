function DynamicField({ field, value, onChange }) {
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
            onChange={handleChange}
          />
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
            onChange={handleChange}
          />
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
            onChange={handleChange}
          />
        </div>
      );

    case "select":
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>

          <select id={field.id} value={value} required={field.required} onChange={handleChange}>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
            onChange={handleChange}
          />

          <label htmlFor={field.id}>{field.label}</label>
        </div>
      );

    case "file":
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>

          <input id={field.id} type="file" required={field.required} onChange={handleChange} />
        </div>
      );

    default:
      return null;
  }
}

export default DynamicField;
