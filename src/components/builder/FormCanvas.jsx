import FieldCard from "./FieldCard";

function FormCanvas({
  fields,
  formValues,
  errors,
  selectedFieldId,
  onChange,
  onRemoveField,
  onEditField,
}) {
  return (
    <section>
      <h2>Form Fields</h2>

      {fields.length === 0 ? (
        <div className="editor-empty-state">
          <p>No fields yet. Add a field from the toolbar to start building your form.</p>
        </div>
      ) : (
        <div className="canvas-fields">
          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              value={formValues[field.id]}
              error={errors[field.id]}
              isSelected={field.id === selectedFieldId}
              onChange={onChange}
              onRemove={onRemoveField}
              onEdit={onEditField}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FormCanvas;