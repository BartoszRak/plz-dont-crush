import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as UIDGenerator from 'uid-generator'

@Injectable()
export class CryptoService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
  }

  async validatePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash)
  }

  async generateUid() {
    const uidgen = new UIDGenerator(512)
    return await uidgen.generate()
  }
}
