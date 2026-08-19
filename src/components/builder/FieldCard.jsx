import DynamicField from "../form/DynamicField";

function FieldCard({
  field,
  value,
  onChange,
  onRemove,
  onEdit,
  isSelected,
}) {
  return (
    <article>
      <div>
        <DynamicField
          field={field}
          value={value}
          onChange={(newValue) =>
            onChange(field.id, newValue)
          }
        />
      </div>

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