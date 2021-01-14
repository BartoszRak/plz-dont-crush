import { TinyTypeOf } from 'tiny-types'

import { TokenEntity } from './token.entity'

export class TokenId extends TinyTypeOf<string>() {}
export class TokenValue extends TinyTypeOf<string>() {}

export class Token {
  protected constructor(
    public readonly id: TokenId,
    public readonly value: TokenValue,
  ) {}

  static fromEntity({ id, value }: TokenEntity) {
    return new Token(new TokenId(id), new TokenValue(value))
  }
}
