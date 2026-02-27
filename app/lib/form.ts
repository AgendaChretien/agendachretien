export function filterEmpty<T extends Record<string, any>>(values: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in values) {
    if (values[key]) {
      result[key] = values[key];
    }
  }

  return result;
}
