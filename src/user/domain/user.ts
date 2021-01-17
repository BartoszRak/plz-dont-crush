import { PasswordHash } from '@main/shared'
import { SwapiCharacter, SwapiCharacterId } from '@main/swapi'

import { plainToClass } from 'class-transformer'
import { UserDto } from '../dto/user.dto'
import { UserEmail, UserId } from './user-values'

export class User {
  constructor(
    readonly id: UserId,
    readonly email: UserEmail,
    readonly swapiCharacter: SwapiCharacter,
    readonly passwordHash: PasswordHash,
  ) {}

  toDto(): UserDto {
    const plainDto: UserDto = {
      id: this.id.value,
      email: this.email.value,
      swapiCharacter: this.swapiCharacter.toDto(),
    }
    return plainToClass(UserDto, plainDto)
  }
}
