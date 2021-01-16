import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { CryptoModule } from '@main/crypto'
import { TokenModule } from '@main/token'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthFactory } from './domain/auth.factory'

@Module({
  imports: [CqrsModule, TokenModule, CryptoModule],
  controllers: [AuthController],
  providers: [AuthService, AuthFactory],
})
export class AuthModule {}
