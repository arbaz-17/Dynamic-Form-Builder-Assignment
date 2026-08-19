const STORAGE_KEY = "dynamic-form-builder-fields";

export function loadFields() {
  try {
    const savedFields = localStorage.getItem(STORAGE_KEY);

    if (!savedFields) {
      return [];
    }

    const parsedFields = JSON.parse(savedFields);

    if (!Array.isArray(parsedFields)) {
      return [];
    }

    return parsedFields;
  } catch (error) {
    console.error("Failed to load saved form fields:", error);
    return [];
  }
}

export function saveFields(fields) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
  } catch (error) {
    console.error("Failed to save form fields:", error);
  }
}
