import { Test } from '@nestjs/testing'
import { TokenFactory } from './token-factory'

let factory: TokenFactory
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [TokenFactory],
  }).compile()

  factory = mockedModule.get(TokenFactory)
})

describe('when attempting to create a Token', () => {
  beforeEach(() => {
    result = factory.create({
      id: 'mockedId',
      value: 'mockedTokenValue',
    })
  })

  it('returns properly created Token', () => {
    expect(result).toMatchInlineSnapshot(`
      Token {
        "id": "mockedId",
        "value": "mockedTokenValue",
      }
    `)
  })
})
