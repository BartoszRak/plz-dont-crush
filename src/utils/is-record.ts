export const isRecord = (
  obj: unknown,
): obj is Readonly<Partial<Record<string | symbol, unknown>>> =>
  typeof obj === 'object' && obj !== null
