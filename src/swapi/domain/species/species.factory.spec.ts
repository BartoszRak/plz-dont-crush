import { Test } from '@nestjs/testing'

import { SpeciesFactory } from './species.factory'

let factory: SpeciesFactory
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [SpeciesFactory],
  }).compile()

  factory = mockedModule.get(SpeciesFactory)
})

describe('create()', () => {
  beforeEach(() => {
    result = factory.create({
      id: 15,
      name: 'Wookie',
    })
  })

  it('returns created species', () => {
    expect(result).toMatchInlineSnapshot(`
      Species {
        "id": 15,
        "name": "Wookie",
      }
    `)
  })
})
