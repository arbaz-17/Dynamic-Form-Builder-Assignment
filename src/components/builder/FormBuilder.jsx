import { useState } from "react";
import { createField } from "../../utils/createField";
import { getInitialValue } from "../../utils/getInitialValue";
import BuilderToolbar from "./BuilderToolbar";
import FormCanvas from "./FormCanvas";
import FieldEditor from "./FieldEditor";

function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const selectedField = fields.find(
    (field) => field.id === selectedFieldId
  );

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

  function handleEditField(fieldId) {
    setSelectedFieldId(fieldId);
  }

  function handleFieldChange(fieldId, value) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  }

  function handleSaveField(updatedField) {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      )
    );

    setSelectedFieldId(null);
  }

  function handleCloseEditor() {
    setSelectedFieldId(null);
  }

  return (
    <main>
      <h1>Dynamic Form Builder</h1>

      <BuilderToolbar onAddField={handleAddField} />

      <p>Field count: {fields.length}</p>

<FormCanvas
  fields={fields}
  formValues={formValues}
  selectedFieldId={selectedFieldId}
  onChange={handleFieldChange}
  onRemoveField={handleRemoveField}
  onEditField={handleEditField}
/>

      {selectedField && (
        <FieldEditor
          key={selectedField.id}
          field={selectedField}
          onSave={handleSaveField}
          onClose={handleCloseEditor}
        />
      )}

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