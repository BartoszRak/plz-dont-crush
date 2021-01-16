import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Either, isLeft, left, right } from 'fp-ts/lib/Either'

import { TokenService } from '@main/token'
import {
  CreateUser,
  CreateUserError,
  GetUserByEmail,
  UserEmail,
} from '@main/user'
import { CryptoService } from '@main/crypto'
import { Password } from '@main/shared'
import { Failure, isDefined } from '@main/utils'

import { Auth } from './domain/auth'
import { AuthFactory } from './domain/auth.factory'

export enum SignUpError {
  UnexpectedError = 'unexpected-error',
  AlreadyExists = 'already-exists',
}

export enum SignInError {
  UserNotFound = 'user-not-found',
  PasswordInvalid = 'password-invalid',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly tokenService: TokenService,
    private readonly cryptoService: CryptoService,
    private readonly authFactory: AuthFactory,
  ) {}

  async signUp(
    email: UserEmail,
    password: Password,
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
    return right(this.authFactory.create({ user, token }))
  }

  async signIn(
    email: UserEmail,
    password: Password,
  ): Promise<Either<Failure<SignInError>, Auth>> {
    const user = await this.queryBus.execute(new GetUserByEmail(email))
    if (!isDefined(user)) {
      return left(new Failure(SignInError.UserNotFound))
    }
    const isPasswordValid = await this.cryptoService.validatePassword(
      password,
      user.passwordHash,
    )
    if (!isPasswordValid) {
      return left(new Failure(SignInError.PasswordInvalid))
    }
    const token = await this.tokenService.issueToken(user.id)
    return right(this.authFactory.create({ user, token }))
  }
}
