export function createField(type) {
  const id = crypto.randomUUID();

  switch (type) {
    case "text":
      return {
        id,
        type: "text",
        label: "Text Field",
        placeholder: "Enter text",
        required: false,
        validation: {
          minLength: null,
          maxLength: null,
          message: "",
        },
      };

    case "email":
      return {
        id,
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        required: false,
        validation: {
          message: "",
        },
      };

    case "number":
      return {
        id,
        type: "number",
        label: "Number",
        placeholder: "Enter a number",
        required: false,
        validation: {
          min: null,
          max: null,
          message: "",
        },
      };

    case "select":
      return {
        id,
        type: "select",
        label: "Select",
        required: false,
        options: [
          {
            label: "Option 1",
            value: "option-1",
          },
        ],
      };

    case "checkbox":
      return {
        id,
        type: "checkbox",
        label: "Checkbox",
        required: false,
      };

    case "file":
      return {
        id,
        type: "file",
        label: "File",
        required: false,
        validation: {
          acceptedTypes: [],
          maxSize: null,
          message: "",
        },
      };

    default:
      throw new Error(`Unsupported field type: ${type}`);
  }
}
