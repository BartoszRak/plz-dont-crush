import { PasswordHash } from '@main/shared'
import { SwapiCharacter, SwapiSpeciesId } from '@main/swapi'

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

  hasPermissionsToSpecies(speciesId: number): boolean {
    return this.swapiCharacter.isSpecies(speciesId)
  }

  getAssignedCharacterSpeciesIds(): SwapiSpeciesId[] {
    return this.swapiCharacter.getAssignedSpecies()
  }

  toDto(): UserDto {
    const plainDto: UserDto = {
      id: this.id.value,
      email: this.email.value,
      swapiCharacter: this.swapiCharacter.toDto(),
    }
    return plainToClass(UserDto, plainDto)
  }
}
