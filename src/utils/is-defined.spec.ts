import { isDefined, assertIsDefined } from './is-defined'

describe(`isDefined()`, () => {
  describe.each([
    [null, false],
    [undefined, false],
    [{}, true],
    [[], true],
    ['', true],
  ])('when passing %p', (input, expectedOutput) => {
    it(`should return ${expectedOutput}`, () => {
      expect(isDefined(input)).toEqual(expectedOutput)
    })
  })
})

describe('assertIsDefined()', () => {
  describe.each(['', [], {}, 0, '0', false])(
    'when value equals to to %p',
    value => {
      it('should not throw', () => {
        expect(() => assertIsDefined(value)).not.toThrow()
      })
    },
  )

  describe.each([undefined, null])('when value equals to to %p', value => {
    it('should throw', () => {
      expect(() => assertIsDefined(value)).toThrow()
    })
  })
})
