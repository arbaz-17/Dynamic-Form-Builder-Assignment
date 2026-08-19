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
    <article>
      <DynamicField
        field={field}
        value={value}
        error={error}
        onChange={(newValue) =>
          onChange(field.id, newValue)
        }
      />

      <div>
        <button
          type="button"
          onClick={() => onEdit(field.id)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onRemove(field.id)}
        >
          Remove
        </button>
      </div>

      {isSelected && <p>Currently editing</p>}
    </article>
  );
}

export default FieldCard;