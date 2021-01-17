import { plainToClass } from 'class-transformer'
import { TokenDto } from '../token.dto'

import { TokenId, TokenValue } from './token-values'

export class Token {
  constructor(public readonly id: TokenId, public readonly value: TokenValue) {}

  toDto(): TokenDto {
    const plainDto: TokenDto = {
      value: this.value.value,
    }
    return plainToClass(TokenDto, plainDto)
  }
}
