import { Query } from '@main/utils'
import { User } from '../domain/user'
import { UserEmail } from '../domain/user-values'

export class GetUserByEmail extends Query<User | undefined> {
  constructor(readonly email: UserEmail) {
    super()
  }
}
