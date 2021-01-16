import { plainToClass } from 'class-transformer'
import { TinyTypeOf } from 'tiny-types'
import { TokenDto } from './token.dto'

import { TokenEntity } from './token.entity'

export class TokenId extends TinyTypeOf<string>() {}
export class TokenValue extends TinyTypeOf<string>() {}

export class Token {
  protected constructor(
    public readonly id: TokenId,
    public readonly value: TokenValue,
  ) {}

  toDto(): TokenDto {
    return plainToClass(TokenDto, {
      value: this.value.value
    })
  }

  static fromEntity({ id, value }: TokenEntity) {
    return new Token(new TokenId(id), new TokenValue(value))
  }
}
