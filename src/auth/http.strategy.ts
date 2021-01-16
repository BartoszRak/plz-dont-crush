import { Strategy } from 'passport-http-bearer'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import { isDefined } from '@main/utils'
import { GetUserByToken } from '@main/user'
import { TokenValue } from '@main/token'

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super()
  }

  async validate(token: string) {
    const user = await this.queryBus.execute(
      new GetUserByToken(new TokenValue(token)),
    )
    if (!isDefined(user)) {
      throw new UnauthorizedException()
    }
    return user
  }
}
