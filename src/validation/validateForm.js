import { validateField } from "./validateField";

export function validateForm(fields, formValues) {
  const errors = {};

  fields.forEach((field) => {
    const value = formValues[field.id];

    const error = validateField(field, value);

    if (error) {
      errors[field.id] = error;
    }
  });

  return errors;
}