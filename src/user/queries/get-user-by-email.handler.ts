import { isDefined } from '@main/utils'
import { IInferringQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../domain/user'
import { UserFactory } from '../domain/user.factory'
import { UserEntity } from '../user.entity'
import { GetUserByEmail } from './get-user-by-email.query'

@QueryHandler(GetUserByEmail)
export class GetUserByEmailHandler
  implements IInferringQueryHandler<GetUserByEmail> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userFactory: UserFactory
  ) {}

  async execute({ email }: GetUserByEmail): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      email: email.value,
    })
    return isDefined(user) ? this.userFactory.create(user) : undefined
  }
}
