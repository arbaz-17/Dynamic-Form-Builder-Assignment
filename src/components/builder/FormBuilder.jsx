import { useState } from "react";
import { createField } from "../../utils/createField";
import { getInitialValue } from "../../utils/getInitialValue";
import BuilderToolbar from "./BuilderToolbar";

function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  function handleAddField(type) {
    const newField = createField(type);
    const initialValue = getInitialValue(newField);

    setFields((prevFields) => [...prevFields, newField]);

    setFormValues((prevValues) => ({
      ...prevValues,
      [newField.id]: initialValue,
    }));
  }

  function handleRemoveField(fieldId) {
    setFields((prevFields) =>
      prevFields.filter((field) => field.id !== fieldId)
    );

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      delete updatedValues[fieldId];

      return updatedValues;
    });

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      delete updatedErrors[fieldId];

      return updatedErrors;
    });

    setSelectedFieldId((prevSelectedId) =>
      prevSelectedId === fieldId ? null : prevSelectedId
    );
  }

  return (
    <main>
      <h1>Dynamic Form Builder</h1>

      <BuilderToolbar onAddField={handleAddField} />

      <p>Field count: {fields.length}</p>

      <h2>Fields</h2>

      {fields.map((field) => (
        <div key={field.id}>
          <span>
            {field.label} ({field.type})
          </span>

          <button
            type="button"
            onClick={() => handleRemoveField(field.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <pre>{JSON.stringify(fields, null, 2)}</pre>

      <h2>Form Values</h2>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>

      <h2>Errors</h2>
      <pre>{JSON.stringify(errors, null, 2)}</pre>

      <p>
        Selected field: {selectedFieldId ?? "None"}
      </p>
    </main>
  );
}

export default FormBuilder;