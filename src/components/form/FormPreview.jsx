import DynamicField from "./DynamicField";

function FormPreview({
  fields,
  formValues,
  errors,
  onChange,
  onSubmit,
  onBack,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section>
      <div>
        <h2>Form Preview</h2>

        <button
          type="button"
          onClick={onBack}
        >
          Back to Builder
        </button>
      </div>

      {fields.length === 0 ? (
        <p>
          No fields have been added to this form yet.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <DynamicField
              key={field.id}
              field={field}
              value={formValues[field.id]}
              error={errors[field.id]}
              onChange={(value) =>
                onChange(field.id, value)
              }
            />
          ))}

          <button type="submit">
            Submit Form
          </button>
        </form>
      )}
    </section>
  );
}

export default FormPreview;