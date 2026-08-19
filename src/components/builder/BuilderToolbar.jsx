function BuilderToolbar({ onAddField }) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onAddField("text")}
      >
        + Text
      </button>

      <button
        type="button"
        onClick={() => onAddField("email")}
      >
        + Email
      </button>

      <button
        type="button"
        onClick={() => onAddField("number")}
      >
        + Number
      </button>

      <button
        type="button"
        onClick={() => onAddField("select")}
      >
        + Select
      </button>

      <button
        type="button"
        onClick={() => onAddField("checkbox")}
      >
        + Checkbox
      </button>

      <button
        type="button"
        onClick={() => onAddField("file")}
      >
        + File
      </button>
    </div>
  );
}

export default BuilderToolbar;