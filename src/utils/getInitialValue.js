export function getInitialValue(field) {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "select":
      return "";

    case "checkbox":
      return false;

    case "file":
      return null;

    default:
      throw new Error(`Unsupported field type: ${field.type}`);
  }
}