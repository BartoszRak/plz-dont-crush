import {
  CharactersManager,
  SwapiCharacter,
  SwapiCharacterId,
} from '@main/swapi'
import { SwapiCharacterName } from '@main/swapi/domain/swapi-character-values'
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
          "id": 13,
          "name": "John James",
        },
      }
    `)
  })
})
