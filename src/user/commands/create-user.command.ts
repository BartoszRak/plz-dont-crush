import { Either } from 'fp-ts/lib/Either'

import { Command, Failure } from '@main/utils'

import { User } from '../domain/user'
import { UserEmail, UserPassword } from '../domain/user-values'

export enum CreateUserError {
  AlreadyExists = 'already-exists',
}

export class CreateUser extends Command<
  Either<Failure<CreateUserError>, User>
> {
  constructor(
    public readonly email: UserEmail,
    public readonly password: UserPassword,
  ) {
    super()
  }
}
