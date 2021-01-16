import { Test } from '@nestjs/testing'
import { UserFactory } from './user.factory'

let factory: UserFactory
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [UserFactory],
  }).compile()

  factory = mockedModule.get(UserFactory)
})

describe('when attempting to create a User', () => {
  beforeEach(() => {
    result = factory.create({
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
        "swapiCharacterId": 441,
      }
    `)
  })
})
