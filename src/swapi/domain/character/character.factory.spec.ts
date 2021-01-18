import { Test } from '@nestjs/testing'
import { CharacterFactory } from './character.factory'

let factory: CharacterFactory
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [CharacterFactory],
  }).compile()

  factory = mockedModule.get(CharacterFactory)
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
      Character {
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
