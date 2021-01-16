import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CryptoModule } from '@main/crypto'

import { TokenEntity } from './token.entity'
import { TokenService } from './token.service'
import { TokenFactory } from './domain/token-factory'

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), CryptoModule],
  providers: [TokenService, TokenFactory],
  exports: [TokenService],
})
export class TokenModule {}
