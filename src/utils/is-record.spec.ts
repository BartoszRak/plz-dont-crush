import { isRecord } from './is-record'

describe.each([
  [{}, true],
  [null, false],
  [undefined, false],
  [2, false],
])('when passing %p', (input, expectedOutput) => {
  it(`returns "${expectedOutput}"`, () => {
    expect(isRecord(input)).toEqual(expectedOutput)
  })
})
