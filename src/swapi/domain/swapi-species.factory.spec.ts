import { Test } from '@nestjs/testing'

import { SwapiSpeciesFactory } from './swapi-species.factory'

let factory: SwapiSpeciesFactory
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [SwapiSpeciesFactory],
  }).compile()

  factory = mockedModule.get(SwapiSpeciesFactory)
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
      SwapiSpecies {
        "id": 15,
        "name": "Wookie",
      }
    `)
  })
})
