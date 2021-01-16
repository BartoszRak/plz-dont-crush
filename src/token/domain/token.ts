import { plainToClass } from 'class-transformer'
import { TokenDto } from '../token.dto'

import { TokenId, TokenValue } from './token-values'

export class Token {
  constructor(
    public readonly id: TokenId,
    public readonly value: TokenValue,
  ) {}

  toDto(): TokenDto {
    return plainToClass(TokenDto, {
      value: this.value.value,
    })
  }
}
