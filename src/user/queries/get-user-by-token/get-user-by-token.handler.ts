import { User } from '@main/user/domain/user'
import { UserFactory } from '@main/user/domain/user.factory'
import { UserEntity } from '@main/user/user.entity'
import { isDefined } from '@main/utils'
import { IInferringQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetUserByToken } from './get-user-by-token.query'

@QueryHandler(GetUserByToken)
export class GetUserByTokenHandler
  implements IInferringQueryHandler<GetUserByToken> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userFactory: UserFactory,
  ) {}

  async execute({ tokenValue }: GetUserByToken): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.tokens', 'token')
      .where('token.value = :tokenValue', { tokenValue: tokenValue.value })
      .getOne()
    return isDefined(user) ? this.userFactory.create(user) : undefined
  }
}
