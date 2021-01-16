import { CryptoModule } from '@main/crypto'
import { SwapiModule } from '@main/swapi'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUserHandler } from './commands/create-user.handler'
import { UserEntity } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule, CryptoModule, SwapiModule],
  providers: [CreateUserHandler]
})
export class UserModule {}
