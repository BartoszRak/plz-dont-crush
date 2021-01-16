import { Injectable } from '@nestjs/common'

import { Token } from '@main/token'
import { User } from '@main/user'

import { Auth } from './auth'

interface Input {
  user: User
  token: Token
}

@Injectable()
export class AuthFactory {
  create({ user, token }: Input): Auth {
    return new Auth(user, token)
  }
}
