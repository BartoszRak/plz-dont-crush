import { Repository } from 'typeorm'
import { CommandHandler, IInferringCommandHandler } from '@nestjs/cqrs'
import { Either, left, right } from 'fp-ts/lib/Either'
import { InjectRepository } from '@nestjs/typeorm'

import { CryptoService } from '@main/crypto'
import { Failure } from '@main/utils'
import { SwapiService } from '@main/swapi'

import { User } from '../domain/user'
import { UserEntity } from '../user.entity'
import { CreateUser, CreateUserError } from './create-user.command'

@CommandHandler(CreateUser)
export class CreateUserHandler implements IInferringCommandHandler<CreateUser> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
    private readonly swapiService: SwapiService,
  ) {}

  async execute({
    email,
    password,
  }: CreateUser): Promise<Either<Failure<CreateUserError>, User>> {
    return this.userRepository.manager.transaction(async manager => {
      const existingUser = await manager.findOne(UserEntity, {
        email: email.value,
      })
      if (existingUser) {
        return left(new Failure(CreateUserError.AlreadyExists))
      }
      const swapiCharacterId = await this.swapiService.getRandomCharacterId()
      const createdUser = await manager.save(
        UserEntity,
        manager.create(UserEntity, {
          email: email.value,
          passwordHash: await this.cryptoService.hashPassword(password.value),
          swapiCharacterId: swapiCharacterId.value,
        }),
      )
      return right(User.fromEntity(createdUser))
    })
  }
}
