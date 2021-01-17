import { Repository } from 'typeorm'
import { CommandHandler, IInferringCommandHandler } from '@nestjs/cqrs'
import { Either, left, right } from 'fp-ts/lib/Either'
import { InjectRepository } from '@nestjs/typeorm'

import { CryptoService } from '@main/crypto'
import { Failure } from '@main/utils'

import { User } from '../domain/user'
import { UserEntity } from '../user.entity'
import { CreateUser, CreateUserError } from './create-user.command'
import { UserFactory } from '../domain/user.factory'
import { CharactersManager } from '@main/swapi'

@CommandHandler(CreateUser)
export class CreateUserHandler implements IInferringCommandHandler<CreateUser> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
    private readonly charactersManager: CharactersManager,
    private readonly userFactory: UserFactory

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
      const swapiCharacterId = await this.charactersManager.getRandomCharacterId()
      const passwordHash = await this.cryptoService.hashPassword(password)
      const createdUser = await manager.save(
        UserEntity,
        manager.create(UserEntity, {
          email: email.value,
          passwordHash: passwordHash.value,
          swapiCharacterId: swapiCharacterId.value,
        }),
      )
      return right(await this.userFactory.create(createdUser))
    })
  }
}
