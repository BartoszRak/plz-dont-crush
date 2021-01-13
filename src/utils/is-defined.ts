export const isDefined = <T>(value: T | undefined | null): value is T => {
  return (value as T) !== undefined && (value as T) !== null
}

export function assertIsDefined<T>(
  value: T | undefined | null,
): asserts value is T {
  if (!isDefined(value)) {
    throw new Error('Value not defined')
  }
}
