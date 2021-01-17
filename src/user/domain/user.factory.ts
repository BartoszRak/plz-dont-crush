import { Injectable } from '@nestjs/common'

import { PasswordHash } from '@main/shared'
import { CharactersManager, SwapiCharacterId } from '@main/swapi'

import { User } from './user'
import { UserEmail, UserId } from './user-values'
import { isDefined } from '@main/utils'

interface Input {
  id: string
  email: string
  swapiCharacterId: number
  passwordHash: string
}

@Injectable()
export class UserFactory {
  constructor(private readonly charactersManager: CharactersManager) {}

  async create({ id, email, swapiCharacterId, passwordHash }: Input): Promise<User> {
    const swapiCharacter = await this.charactersManager.getCharacterById(new SwapiCharacterId(swapiCharacterId))
    if(!isDefined(swapiCharacter)) {
      throw new Error('Unexpect error: User has got assigned SWAPI character that has not been found.')
    }
    return new User(
      new UserId(id),
      new UserEmail(email),
      swapiCharacter,
      new PasswordHash(passwordHash),
    )
  }
}
