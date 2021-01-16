import { PasswordHash } from '@main/shared'
import { SwapiCharacterId } from '@main/swapi'

import { plainToClass } from 'class-transformer'
import { UserDto } from '../dto/user.dto'
import { UserEntity } from '../user.entity'
import { UserEmail, UserId } from './user-values'

export class User {
   constructor(
    readonly id: UserId,
    readonly email: UserEmail,
    readonly swapiCharacterId: SwapiCharacterId,
    readonly passwordHash: PasswordHash,
  ) {}

  toDto(): UserDto {
    return plainToClass(UserDto, {
      id: this.id.value,
      email: this.email.value,
      swapiCharacterId: this.swapiCharacterId.value,
    })
  }
}
