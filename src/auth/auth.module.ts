import { TokenModule } from '@main/token'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [CqrsModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
