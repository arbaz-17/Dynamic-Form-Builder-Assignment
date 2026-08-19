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

  function handleValidationChange(event) {
    const { name, value, type } = event.target;

    let parsedValue = value;

    if (type === "number") {
      parsedValue = value === "" ? null : Number(value);
    }

    setDraft((prevDraft) => ({
      ...prevDraft,
      validation: {
        ...prevDraft.validation,
        [name]: parsedValue,
      },
    }));
  }

  function handleOptionChange(index, key, value) {
    setDraft((prevDraft) => ({
      ...prevDraft,
      options: prevDraft.options.map((option, optionIndex) =>
        optionIndex === index
          ? {
              ...option,
              [key]: value,
            }
          : option
      ),
    }));
  }

  function handleAddOption() {
    setDraft((prevDraft) => {
      const nextOptionNumber = prevDraft.options.length + 1;

      return {
        ...prevDraft,
        options: [
          ...prevDraft.options,
          {
            label: `Option ${nextOptionNumber}`,
            value: `option-${nextOptionNumber}`,
          },
        ],
      };
    });
  }

  function handleRemoveOption(index) {
    setDraft((prevDraft) => ({
      ...prevDraft,
      options: prevDraft.options.filter(
        (_, optionIndex) => optionIndex !== index
      ),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(draft);
  }

  const showPlaceholder =
    field.type !== "checkbox" &&
    field.type !== "file" &&
    field.type !== "select";

  return (
    <aside>
      <h2>Edit Field</h2>

      <form onSubmit={handleSubmit}>
        {/* Label */}
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

        {/* Placeholder */}
        {showPlaceholder && (
          <div>
            <label htmlFor="field-placeholder">Placeholder</label>

            <input
              id="field-placeholder"
              name="placeholder"
              type="text"
              value={draft.placeholder}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Required */}
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

        {/* Select options */}
        {field.type === "select" && (
          <div>
            <h3>Options</h3>

            {draft.options.map((option, index) => (
              <div key={`${option.value}-${index}`}>
                <div>
                  <label htmlFor={`option-label-${index}`}>
                    Label
                  </label>

                  <input
                    id={`option-label-${index}`}
                    type="text"
                    value={option.label}
                    onChange={(event) =>
                      handleOptionChange(
                        index,
                        "label",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label htmlFor={`option-value-${index}`}>
                    Value
                  </label>

                  <input
                    id={`option-value-${index}`}
                    type="text"
                    value={option.value}
                    onChange={(event) =>
                      handleOptionChange(
                        index,
                        "value",
                        event.target.value
                      )
                    }
                  />
                </div>

                {draft.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddOption}
            >
              + Add Option
            </button>
          </div>
        )}

        {/* Text validation */}
        {field.type === "text" && (
          <>
            <div>
              <label htmlFor="min-length">
                Minimum Length
              </label>

              <input
                id="min-length"
                name="minLength"
                type="number"
                min="0"
                value={draft.validation.minLength ?? ""}
                onChange={handleValidationChange}
              />
            </div>

            <div>
              <label htmlFor="max-length">
                Maximum Length
              </label>

              <input
                id="max-length"
                name="maxLength"
                type="number"
                min="0"
                value={draft.validation.maxLength ?? ""}
                onChange={handleValidationChange}
              />
            </div>
          </>
        )}

        {/* Number validation */}
        {field.type === "number" && (
          <>
            <div>
              <label htmlFor="number-min">
                Minimum Value
              </label>

              <input
                id="number-min"
                name="min"
                type="number"
                value={draft.validation.min ?? ""}
                onChange={handleValidationChange}
              />
            </div>

            <div>
              <label htmlFor="number-max">
                Maximum Value
              </label>

              <input
                id="number-max"
                name="max"
                type="number"
                value={draft.validation.max ?? ""}
                onChange={handleValidationChange}
              />
            </div>
          </>
        )}

        {/* File validation */}
        {field.type === "file" && (
          <>
            <div>
              <label htmlFor="accepted-types">
                Accepted File Types
              </label>

              <input
                id="accepted-types"
                type="text"
                placeholder="e.g. image/png, application/pdf"
                value={draft.validation.acceptedTypes.join(", ")}
                onChange={(event) => {
                  const acceptedTypes = event.target.value
                    .split(",")
                    .map((type) => type.trim())
                    .filter(Boolean);

                  setDraft((prevDraft) => ({
                    ...prevDraft,
                    validation: {
                      ...prevDraft.validation,
                      acceptedTypes,
                    },
                  }));
                }}
              />
            </div>

            <div>
              <label htmlFor="max-file-size">
                Maximum File Size (bytes)
              </label>

              <input
                id="max-file-size"
                name="maxSize"
                type="number"
                min="0"
                value={draft.validation.maxSize ?? ""}
                onChange={handleValidationChange}
              />
            </div>
          </>
        )}

        {/* Custom validation message */}
        {field.type !== "checkbox" && (
          <div>
            <label htmlFor="validation-message">
              Error Message
            </label>

            <input
              id="validation-message"
              name="message"
              type="text"
              value={draft.validation?.message ?? ""}
              onChange={handleValidationChange}
              placeholder="Enter a custom error message"
            />
          </div>
        )}

        {/* Actions */}
        <div>
          <button type="submit">Save</button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </aside>
  );
}

export default FieldEditor;