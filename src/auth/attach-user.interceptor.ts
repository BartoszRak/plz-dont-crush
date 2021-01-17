import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import { TokenValue } from '@main/token'
import { GetUserByToken } from '@main/user'
import { isDefined } from '@main/utils'
import { Request } from 'express'

@Injectable()
export class AttachUserInterceptor implements NestInterceptor {
  constructor(private readonly queryBus: QueryBus) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req: Request = context.switchToHttp().getRequest()
    const authorization: string | undefined = req.headers.authorization
    if (!isDefined(authorization)) {
      return next.handle()
    }
    const [tokenPrefix, token] = authorization.split(' ')
    if (tokenPrefix !== 'Bearer') {
      return next.handle()
    }
    const user = await this.queryBus.execute(
      new GetUserByToken(new TokenValue(token)),
    )
    req.user = user
    return next.handle()
  }
}
