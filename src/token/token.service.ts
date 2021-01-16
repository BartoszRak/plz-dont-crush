import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CryptoService } from '@main/crypto'
import { UserId } from '@main/user'

import { Token } from './token'
import { TokenEntity } from './token.entity'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokensRepository: Repository<TokenEntity>,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * Deletes all old tokens, creates and returns new one.
   * @param userId User's ID.
   */
  async issueToken(userId: UserId): Promise<Token> {
    this.tokensRepository.delete({
      user: {
        id: userId.value,
      },
    })
    const token = await this.tokensRepository.save(
      this.tokensRepository.create({
        value: await this.cryptoService.generateUid(),
        userId: userId.value,
      }),
    )
    return Token.fromEntity(token)
  }
}
