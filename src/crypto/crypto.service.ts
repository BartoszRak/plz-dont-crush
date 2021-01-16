import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as UIDGenerator from 'uid-generator'

import { Password, PasswordHash } from '@main/shared'


@Injectable()
export class CryptoService {
  async hashPassword(password: Password): Promise<PasswordHash> {
    const salt = await bcrypt.genSalt(12)
    return new PasswordHash(await bcrypt.hash(password.value, salt))
  }

  async validatePassword(
    password: Password,
    passwordHash: PasswordHash,
  ): Promise<boolean> {
    return await bcrypt.compare(password.value, passwordHash.value)
  }

  async generateUid() {
    const uidgen = new UIDGenerator(512)
    return await uidgen.generate()
  }
}
