import { isDefined } from './is-defined'
import { NonNullableByKey } from './non-nullable-by-key.type'

export const isPropDefined = <T extends object, K extends keyof T>(
  obj: T | NonNullableByKey<T, K>,
  key: K,
): obj is NonNullableByKey<T, K> => isDefined(obj[key])
