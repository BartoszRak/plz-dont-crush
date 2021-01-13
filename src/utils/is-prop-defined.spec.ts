import { isPropDefined } from './is-prop-defined'

const testObject = {
  existing: 'prop',
  emptyString: '',
  zero: 0,
  null: null,
  aUndefined: undefined,
}

it(`should return false for undefined`, () => {
  expect(isPropDefined(testObject, 'reallyUndefined' as any)).toBe(false)
})

it(`should return false for existing but undefined`, () => {
  expect(isPropDefined(testObject, 'aUndefined')).toBe(false)
})

it(`should return false for null`, () => {
  expect(isPropDefined(testObject, 'null')).toBe(false)
})

it(`should return true for zero`, () => {
  expect(isPropDefined(testObject, 'zero')).toBe(true)
})

it(`should return true for empty string`, () => {
  expect(isPropDefined(testObject, 'emptyString')).toBe(true)
})

it(`should return true for non-empty string`, () => {
  expect(isPropDefined(testObject, 'existing')).toBe(true)
})
