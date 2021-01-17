import { Token } from '@main/token'
import { User } from '@main/user'
import { plainToClass } from 'class-transformer'
import { AuthDto } from '../dto/auth.dto'

export class Auth {
  constructor(public readonly user: User, public readonly token: Token) {}

  toDto(): AuthDto {
    const plainDto: AuthDto = {
      user: this.user.toDto(),
      token: this.token.toDto(),
    }
    return plainToClass(AuthDto, plainDto)
  }
}
