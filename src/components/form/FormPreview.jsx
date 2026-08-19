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
    <div className="preview-container">
      <div className="preview-header">
        <h2>Live Preview</h2>
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back to Builder
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="preview-empty-state">
          <p>No fields have been added to this form yet.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="preview-form">
          <div className="preview-fields">
            {fields.map((field) => (
              <div key={field.id} className="preview-field-wrapper">
                <DynamicField
                  field={field}
                  value={formValues[field.id]}
                  error={errors[field.id]}
                  onChange={(value) => onChange(field.id, value)}
                />
              </div>
            ))}
          </div>

          <div className="preview-actions">
            <button type="submit" className="btn-primary">
              Submit Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormPreview;