import { plainToClass } from 'class-transformer'
import { UserDto } from './user.dto'
import { UserEntity } from './user.entity'
import { TinyTypeOf } from 'tiny-types'

export class UserId extends TinyTypeOf<string>() {}
export class UserEmail extends TinyTypeOf<string>() {}

export class User {
  protected constructor(public id: UserId, public email: UserEmail) {}

  toDto(): UserDto {
    return plainToClass(UserDto, {
      id: this.id.value,
      email: this.email.value,
    })
  }

  static fromEntity({ email, id }: UserEntity) {
    return new User(new UserId(id), new UserEmail(email))
  }
}
