import { Either } from 'fp-ts/lib/Either'

import { Command, Failure } from '@main/utils'

import { User } from '../domain/user'
import { UserEmail } from '../domain/user-values'
import { Password } from '@main/shared'

export enum CreateUserError {
  AlreadyExists = 'already-exists',
}

export class CreateUser extends Command<
  Either<Failure<CreateUserError>, User>
> {
  constructor(readonly email: UserEmail, readonly password: Password) {
    super()
  }
}
