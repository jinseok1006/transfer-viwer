export function contains<T, U extends T>(
  list: ReadonlyArray<U>,
  value: T
): value is U {
  return list.some((item) => item === value);
}
