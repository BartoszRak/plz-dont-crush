import { plainToClass } from 'class-transformer'
import { UserDto } from '../dto/user.dto'
import { UserEntity } from '../user.entity'
import { SwapiCharacterId } from '@main/swapi'
import { UserEmail, UserId } from './user-values'

export class User {
  protected constructor(
    public readonly id: UserId,
    public readonly email: UserEmail,
    public readonly swapiCharacterId: SwapiCharacterId,
  ) {}

  toDto(): UserDto {
    return plainToClass(UserDto, {
      id: this.id.value,
      email: this.email.value,
      swapiCharacterId: this.swapiCharacterId.value,
    })
  }

  static fromEntity({ email, id, swapiCharacterId }: UserEntity) {
    return new User(
      new UserId(id),
      new UserEmail(email),
      new SwapiCharacterId(swapiCharacterId),
    )
  }
}
