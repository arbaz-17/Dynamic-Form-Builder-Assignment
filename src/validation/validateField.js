export function validateField(field, value) {
  const customMessage = field.validation?.message?.trim();

  if (field.required) {
    const isEmpty =
      value === "" ||
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "");

    if (isEmpty) {
      return customMessage || `${field.label} is required.`;
    }

    if (field.type === "checkbox" && value !== true) {
      return customMessage || `${field.label} is required.`;
    }
  }

  switch (field.type) {
    case "text": {
      if (typeof value !== "string") {
        return null;
      }

      const { minLength, maxLength } = field.validation;

      if (minLength !== null && value.length < minLength) {
        return (
          customMessage ||
          `${field.label} must be at least ${minLength} characters.`
        );
      }

      if (maxLength !== null && value.length > maxLength) {
        return (
          customMessage ||
          `${field.label} must be at most ${maxLength} characters.`
        );
      }

      return null;
    }

    case "email": {
      if (typeof value !== "string" || value === "") {
        return null;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        return customMessage || `${field.label} must be a valid email address.`;
      }

      return null;
    }

    case "number": {
      if (value === "") {
        return null;
      }

      const numberValue = Number(value);

      if (Number.isNaN(numberValue)) {
        return customMessage || `${field.label} must be a valid number.`;
      }

      const { min, max } = field.validation;

      if (min !== null && numberValue < min) {
        return customMessage || `${field.label} must be at least ${min}.`;
      }

      if (max !== null && numberValue > max) {
        return customMessage || `${field.label} must be at most ${max}.`;
      }

      return null;
    }

    case "select": {
      return null;
    }

    case "checkbox": {
      return null;
    }

    case "file": {
      if (!value) {
        return null;
      }

      const { acceptedTypes, maxSize } = field.validation;

      if (acceptedTypes.length > 0 && !acceptedTypes.includes(value.type)) {
        return customMessage || `${field.label} has an unsupported file type.`;
      }

      if (maxSize !== null && value.size > maxSize) {
        return (
          customMessage ||
          `${field.label} exceeds the maximum allowed file size.`
        );
      }

      return null;
    }

    default:
      return null;
  }
}
