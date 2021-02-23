import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'

import { CryptoModule } from '@main/crypto'
import { TokenModule } from '@main/token'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthFactory } from './domain/auth.factory'
import { HttpStrategy } from './http.strategy'

const RegisteredPassportModule = PassportModule.register({
  defaultStrategy: 'bearer',
})

@Module({
  imports: [RegisteredPassportModule, CqrsModule, TokenModule, CryptoModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthFactory,
    HttpStrategy,
  ],
  exports: [RegisteredPassportModule],
})
export class AuthModule {}
