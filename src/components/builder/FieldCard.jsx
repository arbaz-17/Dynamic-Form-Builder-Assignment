import DynamicField from "../form/DynamicField";

function FieldCard({
  field,
  value,
  error,
  onChange,
  onRemove,
  onEdit,
  isSelected,
}) {
  return (
    <article className={`field-card ${isSelected ? "field-card-selected" : ""}`}>
      <DynamicField
        field={field}
        value={value}
        error={error}
        onChange={(newValue) => onChange(field.id, newValue)}
      />

      <div className="field-card-actions">
        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => onEdit(field.id)}
        >
          Edit Field
        </button>

        <button 
          type="button" 
          className="btn-danger"
          onClick={() => onRemove(field.id)}
        >
          Remove
        </button>
      </div>

      {isSelected && (
        <span className="field-selected-indicator">Editing</span>
      )}
    </article>
  );
}

export default FieldCard;