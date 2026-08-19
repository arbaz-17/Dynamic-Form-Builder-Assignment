import { useState } from "react";

function FieldEditor({ field, onSave, onClose }) {
  const [draft, setDraft] = useState(field);

  if (!field) {
    return null;
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setDraft((prevDraft) => ({
      ...prevDraft,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(draft);
  }

  return (
    <aside>
      <h2>Edit Field</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="field-label">Label</label>

          <input
            id="field-label"
            name="label"
            type="text"
            value={draft.label}
            onChange={handleChange}
          />
        </div>

        {field.type !== "checkbox" &&
          field.type !== "file" &&
          field.type !== "select" && (
            <div>
              <label htmlFor="field-placeholder">
                Placeholder
              </label>

              <input
                id="field-placeholder"
                name="placeholder"
                type="text"
                value={draft.placeholder}
                onChange={handleChange}
              />
            </div>
          )}

        <div>
          <label>
            <input
              name="required"
              type="checkbox"
              checked={draft.required}
              onChange={handleChange}
            />

            Required
          </label>
        </div>

        <button type="submit">Save</button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </aside>
  );
}

export default FieldEditor;