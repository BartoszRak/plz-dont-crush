import { PasswordHash } from '@main/shared'
import { SwapiCharacterId } from '@main/swapi'

import { plainToClass } from 'class-transformer'
import { SwapiCharacterDto } from '../dto/swapi-character.dto'
import { SwapiCharacterName } from './swapi-character-values'

export class SwapiCharacter {
  constructor(readonly id: SwapiCharacterId, readonly name: SwapiCharacterName) {}

  toDto(): SwapiCharacterDto {
    return plainToClass(SwapiCharacterDto, {
      id: this.id.value,
      name: this.name.value
    })
  }
}
