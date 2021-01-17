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
    })
  })

  it('returns created swapi character', () => {
    expect(result).toMatchInlineSnapshot(`
      SwapiCharacter {
        "id": 98,
        "name": "George Patton",
      }
    `)
  })
})
