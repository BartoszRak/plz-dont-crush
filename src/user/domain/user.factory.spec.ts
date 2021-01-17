import {
  CharactersManager,
  SwapiCharacter,
  SwapiCharacterId,
} from '@main/swapi'
import {
  SwapiCharacterFilmsIds,
  SwapiCharacterName,
  SwapiCharacterPlanetId,
  SwapiCharacterSpeciesIds,
  SwapiCharacterStarshipsIds,
  SwapiCharacterVehiclesIds,
} from '@main/swapi/domain/swapi-character-values'
import { Test } from '@nestjs/testing'
import { UserFactory } from './user.factory'

let factory: UserFactory
let result: unknown
let charactersManagerMock: jest.Mocked<CharactersManager>

beforeEach(async () => {
  charactersManagerMock = {} as jest.Mocked<CharactersManager>
  charactersManagerMock.getCharacterById = jest
    .fn()
    .mockReturnValue(
      new SwapiCharacter(
        new SwapiCharacterId(13),
        new SwapiCharacterName('John James'),
        new SwapiCharacterFilmsIds([14, 52]),
        new SwapiCharacterSpeciesIds([2]),
        new SwapiCharacterVehiclesIds([]),
        new SwapiCharacterStarshipsIds([3, 2, 63, 12]),
        new SwapiCharacterPlanetId(55),
      ),
    )

  const mockedModule = await Test.createTestingModule({
    providers: [
      {
        provide: CharactersManager,
        useValue: charactersManagerMock,
      },
      UserFactory,
    ],
  }).compile()

  factory = mockedModule.get(UserFactory)
})

describe('create()', () => {
  beforeEach(async () => {
    result = await factory.create({
      id: 'mockedId',
      swapiCharacterId: 441,
      passwordHash: 'mockedPasswordHash',
      email: 'mocked@email.com',
    })
  })

  it('returns properly created User', () => {
    expect(result).toMatchInlineSnapshot(`
      User {
        "email": "mocked@email.com",
        "id": "mockedId",
        "passwordHash": "mockedPasswordHash",
        "swapiCharacter": SwapiCharacter {
          "filmsIds": Array [
            14,
            52,
          ],
          "id": 13,
          "name": "John James",
          "planetId": 55,
          "speciesIds": Array [
            2,
          ],
          "starshipsIds": Array [
            3,
            2,
            63,
            12,
          ],
          "vehiclesIds": Array [],
        },
      }
    `)
  })
})
