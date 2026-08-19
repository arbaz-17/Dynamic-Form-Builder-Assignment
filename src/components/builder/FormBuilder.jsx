import { useState } from "react";
import { createField } from "../../utils/createField";
import { getInitialValue } from "../../utils/getInitialValue";
import { validateForm } from "../../validation/validateForm";
import BuilderToolbar from "./BuilderToolbar";
import FormCanvas from "./FormCanvas";
import FieldEditor from "./FieldEditor";
import FormPreview from "../form/FormPreview";

function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [formValues, setFormValues] = useState({});

  const [errors, setErrors] = useState({});

  const [mode, setMode] = useState("builder");

  const [submissionState, setSubmissionState] = useState("idle");

  const selectedField = fields.find((field) => field.id === selectedFieldId);

  function handleAddField(type) {
    const newField = createField(type);
    const initialValue = getInitialValue(newField);

    setFields((prevFields) => [...prevFields, newField]);

    setFormValues((prevValues) => ({
      ...prevValues,
      [newField.id]: initialValue,
    }));

    setSubmissionState("idle");
  }

  function handleRemoveField(fieldId) {
    setFields((prevFields) =>
      prevFields.filter((field) => field.id !== fieldId),
    );

    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
      };

      delete updatedValues[fieldId];

      return updatedValues;
    });

    setErrors((prevErrors) => {
      const updatedErrors = {
        ...prevErrors,
      };

      delete updatedErrors[fieldId];

      return updatedErrors;
    });

    setSelectedFieldId((prevSelectedId) =>
      prevSelectedId === fieldId ? null : prevSelectedId,
    );

    setSubmissionState("idle");
  }

  function handleEditField(fieldId) {
    setSelectedFieldId(fieldId);
  }

  function handleFieldChange(fieldId, value) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));

    setErrors((prevErrors) => {
      if (!prevErrors[fieldId]) {
        return prevErrors;
      }

      const updatedErrors = {
        ...prevErrors,
      };

      delete updatedErrors[fieldId];

      return updatedErrors;
    });

    setSubmissionState("idle");
  }

  function handleSaveField(updatedField) {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === updatedField.id ? updatedField : field,
      ),
    );

    setErrors((prevErrors) => {
      if (!prevErrors[updatedField.id]) {
        return prevErrors;
      }

      const updatedErrors = {
        ...prevErrors,
      };

      delete updatedErrors[updatedField.id];

      return updatedErrors;
    });

    setSelectedFieldId(null);
    setSubmissionState("idle");
  }

  function handleCloseEditor() {
    setSelectedFieldId(null);
  }

  function validateCurrentForm() {
    const validationErrors = validateForm(fields, formValues);

    setErrors(validationErrors);

    return validationErrors;
  }

  function handlePreview() {
    setSelectedFieldId(null);
    setErrors({});
    setSubmissionState("idle");
    setMode("preview");
  }

  function handleBackToBuilder() {
    setSelectedFieldId(null);
    setSubmissionState("idle");
    setMode("builder");
  }

  function handleSubmit() {
    const validationErrors = validateCurrentForm();

    const isValid = Object.keys(validationErrors).length === 0;

    if (!isValid) {
      setSubmissionState("idle");
      return;
    }

    setSubmissionState("success");

    console.log("Submitted form data:", formValues);
  }

  if (mode === "preview") {
    return (
      <main>
        <h1>Dynamic Form Builder</h1>

        <FormPreview
          fields={fields}
          formValues={formValues}
          errors={errors}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          onBack={handleBackToBuilder}
        />

        {submissionState === "success" && (
          <section>
            <h2>Form Submitted Successfully</h2>
            <p>The form passed validation and was submitted successfully.</p>
          </section>
        )}
      </main>
    );
  }

  return (
    <main>
      <h1>Dynamic Form Builder</h1>

      <BuilderToolbar onAddField={handleAddField} />

      <p>Field count: {fields.length}</p>

      <FormCanvas
        fields={fields}
        formValues={formValues}
        errors={errors}
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

      <div>
        <button
          type="button"
          onClick={handlePreview}
          disabled={fields.length === 0}
        >
          Preview Form
        </button>
      </div>
    </main>
  );
}

export default FormBuilder;
