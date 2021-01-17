import { Test } from '@nestjs/testing'
import { SwapiCharacterFactory } from './swapi-character.factory'

let factory: SwapiCharacterFactory
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [SwapiCharacterFactory],
  }).compile()

  factory = mockedModule.get(SwapiCharacterFactory)
})

describe('create()', () => {
  beforeEach(() => {
    result = factory.create({
      id: 98,
      name: 'George Patton',
      filmsIds: [],
      speciesIds: [4, 6, 13],
      vehiclesIds: [1],
      starshipsIds: [59, 21],
      homeworldId: 15,
    })
  })

  it('returns created swapi character', () => {
    expect(result).toMatchInlineSnapshot(`
      SwapiCharacter {
        "filmsIds": Array [],
        "id": 98,
        "name": "George Patton",
        "planetId": 15,
        "speciesIds": Array [
          4,
          6,
          13,
        ],
        "starshipsIds": Array [
          59,
          21,
        ],
        "vehiclesIds": Array [
          1,
        ],
      }
    `)
  })
})
