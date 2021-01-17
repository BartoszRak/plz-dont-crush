import { Request } from 'express'

import { User } from '@main/user'

export type AuthorizedRequest = Request & {
  user: User
}
