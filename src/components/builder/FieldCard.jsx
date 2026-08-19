import DynamicField from "../form/DynamicField";

function FieldCard({
  field,
  value,
  onChange,
  onRemove,
  onEdit,
}) {
  return (
    <article>
      <DynamicField
        field={field}
        value={value}
        onChange={(newValue) => onChange(field.id, newValue)}
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
    </article>
  );
}

export default FieldCard;