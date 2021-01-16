import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Either, isLeft, left, right } from 'fp-ts/lib/Either'

import { Token, TokenService } from '@main/token'
import { CreateUser, CreateUserError, User, UserEmail, UserPassword } from '@main/user'
import { Failure } from '@main/utils'
import { Auth } from './auth'

export enum SignUpError {
  UnexpectedError = 'unexpected-error',
  AlreadyExists = 'already-exists',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(
    email: UserEmail,
    password: UserPassword,
  ): Promise<Either<Failure<SignUpError>, Auth>> {
    const createResult = await this.commandBus.execute(
      new CreateUser(email, password),
    )
    if (isLeft(createResult)) {
      const errorPairs: Record<CreateUserError, SignUpError> = {
        [CreateUserError.AlreadyExists]: SignUpError.AlreadyExists,
      }
      return left(new Failure(errorPairs[createResult.left.error.errorCode]))
    }
    const user = createResult.right
    const token = await this.tokenService.issueToken(createResult.right.id)
    return right(Auth.create(user, token))
  }
}
