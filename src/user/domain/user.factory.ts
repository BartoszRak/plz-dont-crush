import { Injectable } from '@nestjs/common'

import { PasswordHash } from '@main/shared'
import { SwapiCharacterId } from '@main/swapi'

import { User } from './user'
import { UserEmail, UserId } from './user-values'

interface Input {
  id: string
  email: string
  swapiCharacterId: number
  passwordHash: string
}

@Injectable()
export class UserFactory {
  create({ id, email, swapiCharacterId, passwordHash }: Input): User {
    return new User(
      new UserId(id),
      new UserEmail(email),
      new SwapiCharacterId(swapiCharacterId),
      new PasswordHash(passwordHash),
    )
  }
}
