import { CryptoModule } from '@main/crypto'
import { SwapiModule } from '@main/swapi'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUserHandler } from './commands/create-user.handler'
import { UserFactory } from './domain/user.factory'
import { GetUserByEmailHandler } from './queries/get-user-by-email/get-user-by-email.handler'
import { GetUserByTokenHandler } from './queries/get-user-by-token/get-user-by-token.handler'
import { UserEntity } from './user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
    CryptoModule,
    SwapiModule,
  ],
  providers: [
    CreateUserHandler,
    GetUserByEmailHandler,
    GetUserByTokenHandler,
    UserFactory,
  ],
})
export class UserModule {}
