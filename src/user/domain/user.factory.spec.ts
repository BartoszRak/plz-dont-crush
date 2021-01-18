import {
  CharactersManager,
  Character,
  CharacterId,
  SpeciesId,
} from '@main/swapi'
import {
  CharacterFilmsIds,
  CharacterName,
  CharacterPlanetId,
  CharacterSpeciesIds,
  CharacterStarshipsIds,
  CharacterVehiclesIds,
} from '@main/swapi/domain/character/character-values'
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
      new Character(
        new CharacterId(13),
        new CharacterName('John James'),
        new CharacterFilmsIds([14, 52]),
        new CharacterSpeciesIds([]),
        new CharacterVehiclesIds([new SpeciesId(2)]),
        new CharacterStarshipsIds([3, 2, 63, 12]),
        new CharacterPlanetId(55),
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
        "swapiCharacter": Character {
          "filmsIds": Array [
            14,
            52,
          ],
          "id": 13,
          "name": "John James",
          "planetId": 55,
          "speciesIds": Array [],
          "starshipsIds": Array [
            3,
            2,
            63,
            12,
          ],
          "vehiclesIds": Array [
            2,
          ],
        },
      }
    `)
  })
})
