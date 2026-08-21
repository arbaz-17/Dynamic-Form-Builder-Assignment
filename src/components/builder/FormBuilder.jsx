import { useEffect, useState } from "react";
import { createField } from "../../utils/createField";
import { getInitialValue } from "../../utils/getInitialValue";
import { getInitialFormValues } from "../../utils/getInitialFormValues";
import { loadFields, saveFields } from "../../utils/storage";
import { validateForm } from "../../validation/validateForm";
import BuilderToolbar from "./BuilderToolbar";
import FormCanvas from "./FormCanvas";
import FieldEditor from "./FieldEditor";
import FormPreview from "../form/FormPreview";

function FormBuilder() {
  const [fields, setFields] = useState(() => loadFields());
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState("builder");
  const [submissionState, setSubmissionState] = useState("idle");

  useEffect(() => {
    saveFields(fields);
  }, [fields]);

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

      const updatedErrors = { ...prevErrors };

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

      const updatedErrors = { ...prevErrors };

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
    setErrors({});
    setSubmissionState("idle");

    setFormValues(getInitialFormValues(fields));

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
      <main className="app-shell">
        <header className="app-header">
          <h1>Preview Mode</h1>

          <p>Test your form.</p>
        </header>

        <section className="builder-section">
          <FormPreview
            fields={fields}
            formValues={formValues}
            errors={errors}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            onBack={handleBackToBuilder}
          />

          {submissionState === "success" && (
            <div className="success-banner">
              <h3>Form Submitted Successfully</h3>

              <p>The form passed validation and data was recorded.</p>
            </div>
          )}
        </section>
      </main>
    );
  }


  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Dynamic Form Builder - Week 5 Assignment</h1>

        <p>
          Create and configure form fields, then preview the generated form.
        </p>
      </header>

      <section className="builder-layout">
        <div className="builder-main">
          <section className="builder-section">
            <h2>Add Fields</h2>

            <BuilderToolbar onAddField={handleAddField} />
          </section>

          <section className="builder-section">
            <FormCanvas
              fields={fields}
              formValues={formValues}
              errors={errors}
              selectedFieldId={selectedFieldId}
              onChange={handleFieldChange}
              onRemoveField={handleRemoveField}
              onEditField={handleEditField}
            />
          </section>

          <section className="builder-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handlePreview}
              disabled={fields.length === 0}
            >
              Preview Form &rarr;
            </button>
          </section>
        </div>

        <aside className="editor-panel">
          {selectedField ? (
            <FieldEditor
              key={selectedField.id}
              field={selectedField}
              onSave={handleSaveField}
              onClose={handleCloseEditor}
            />
          ) : (
            <div className="editor-empty-state">
              <h2>Field Editor</h2>

              <p>
                Select a field in the canvas and click Edit to configure it.
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

export default FormBuilder;
