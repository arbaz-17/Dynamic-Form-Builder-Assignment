import { getInitialValue } from "./getInitialValue";

export function getInitialFormValues(fields) {
  return fields.reduce((values, field) => {
    values[field.id] = getInitialValue(field);

    return values;
  }, {});
}