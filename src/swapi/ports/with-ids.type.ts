import { UnionToIntersection } from 'utility-types'

export type WithIds<
  Data,
  IdFields extends keyof any | undefined = undefined,
  IdArrayFields extends keyof any | undefined = undefined,
  Id = number
> = UnionToIntersection<
  IdFields extends keyof any ? { [key in IdFields]: Id } : object
> &
  UnionToIntersection<
    IdArrayFields extends keyof any ? { [key in IdArrayFields]: Id[] } : object
  > & { id: Id } & Data
