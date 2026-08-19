import FieldCard from "./FieldCard";

function FormCanvas({
  fields,
  formValues,
  onChange,
  onRemoveField,
  onEditField,
}) {
  if (fields.length === 0) {
    return (
      <section>
        <h2>Form Fields</h2>
        <p>No fields yet. Add a field to start building your form.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Form Fields</h2>

      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          value={formValues[field.id]}
          onChange={onChange}
          onRemove={onRemoveField}
          onEdit={onEditField}
        />
      ))}
    </section>
  );
}

export default FormCanvas;