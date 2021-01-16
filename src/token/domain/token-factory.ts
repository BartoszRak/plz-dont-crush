import { Injectable } from '@nestjs/common'
import { Token } from './token'
import { TokenId, TokenValue } from './token-values'

interface Input {
  id: string
  value: string
}

@Injectable()
export class TokenFactory {
  create({ id, value }: Input): Token {
    return new Token(new TokenId(id), new TokenValue(value))
  }
}
