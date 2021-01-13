import { isRecord } from './is-record'

it(`should return true for object`, () => {
  expect(isRecord({})).toBe(true)
})

it(`should return false for null`, () => {
  expect(isRecord(null)).toBe(false)
})

it(`should return false for undefined`, () => {
  expect(isRecord(undefined)).toBe(false)
})

it(`should return false for number`, () => {
  expect(isRecord(2)).toBe(false)
})
