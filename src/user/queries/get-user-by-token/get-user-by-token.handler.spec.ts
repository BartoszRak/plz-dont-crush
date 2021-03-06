import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TokenValue } from '@main/token'
import { UserFactory } from '@main/user/domain/user.factory'
import { UserEntity } from '@main/user/user.entity'
import {
  createInfiniteProxy,
  InfiniteProxy,
} from '@main/utils/create-infinite-proxy'

import { GetUserByTokenHandler } from './get-user-by-token.handler'
import { GetUserByToken } from './get-user-by-token.query'
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

let handler: GetUserByTokenHandler
let userRepositoryMock: jest.Mocked<Repository<UserEntity>>
let charactersManagerMock: jest.Mocked<CharactersManager>
let result: unknown

beforeEach(async () => {
  userRepositoryMock = {} as jest.Mocked<Repository<UserEntity>>
  charactersManagerMock = {} as jest.Mocked<CharactersManager>
  charactersManagerMock.getCharacterById = jest
    .fn()
    .mockReturnValue(
      new Character(
        new CharacterId(13),
        new CharacterName('John James'),
        new CharacterFilmsIds([14, 52]),
        new CharacterSpeciesIds([new SpeciesId(2)]),
        new CharacterVehiclesIds([]),
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
      GetUserByTokenHandler,
      {
        provide: getRepositoryToken(UserEntity),
        useValue: userRepositoryMock,
      },
    ],
  }).compile()

  handler = mockedModule.get(GetUserByTokenHandler)
})

describe('when getting user', () => {
  let resultMock: jest.Mock
  let queryBuilderMock: InfiniteProxy

  beforeEach(() => {
    resultMock = jest.fn()
    queryBuilderMock = createInfiniteProxy({
      getOne: resultMock,
    })
    userRepositoryMock.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilderMock)
  })

  describe('when user has been found', () => {
    const mockedUserEntity: UserEntity = {
      id: 'mockedId',
      email: 'user@email.com',
      swapiCharacterId: 52,
      passwordHash: 'mockedPasswordHash',
      createdAt: new Date('2020-11-22'),
      updatedAt: new Date('2021-11-22'),
    }

    beforeEach(async () => {
      resultMock.mockResolvedValue(mockedUserEntity)
      result = await handler.execute(
        new GetUserByToken(new TokenValue('mockedTokenValue')),
      )
    })

    it('attempts to get a user properly', () => {
      expect(userRepositoryMock.createQueryBuilder.mock.calls)
        .toMatchInlineSnapshot(`
        Array [
          Array [
            "user",
          ],
        ]
      `)
      expect(queryBuilderMock.mock.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "leftJoin",
            "user.tokens",
            "token",
          ],
          Array [
            "where",
            "token.value = :tokenValue",
            Object {
              "tokenValue": "mockedTokenValue",
            },
          ],
          Array [
            "getOne",
          ],
        ]
      `)
    })

    it('returns a user', () => {
      expect(result).toMatchInlineSnapshot(`
        User {
          "email": "user@email.com",
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

  describe('when user has not been found', () => {
    beforeEach(async () => {
      resultMock.mockResolvedValue(undefined)
      result = await handler.execute(
        new GetUserByToken(new TokenValue('mockedTokenValue')),
      )
    })

    it('returns nothing', () => {
      expect(result).toBeUndefined()
    })
  })
})
