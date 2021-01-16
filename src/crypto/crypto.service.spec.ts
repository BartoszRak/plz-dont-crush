import { Password, PasswordHash } from '@main/shared'
import { Test } from '@nestjs/testing'

import { CryptoService } from './crypto.service'

const mockedPassword = new Password('abc123')

let service: CryptoService
let result: unknown

beforeEach(async () => {
  const mockedModule = await Test.createTestingModule({
    providers: [CryptoService],
  }).compile()

  service = mockedModule.get(CryptoService)
})

describe('hashPassword() & validatePassword()', () => {
  describe('when attempting to hash raw password', () => {
    let createdHash: PasswordHash

    beforeEach(async () => {
      createdHash = await service.hashPassword(mockedPassword)
    })

    it('returns a valid hash', () => {
      expect(createdHash.value).not.toBe(mockedPassword.value)
      expect(createdHash.value.length).not.toBe(0)
    })

    describe('when attempting to validate created hash', () => {
      describe('when passing valid password', () => {
        beforeEach(async () => {
          result = await service.validatePassword(mockedPassword, createdHash)
        })

        it('returns a true', () => {
          expect(result).toBe(true)
        })
      })

      describe('when passing invalid password', () => {
        beforeEach(async () => {
          result = await service.validatePassword(
            new Password('invalid-password'),
            createdHash,
          )
        })

        it('returns a false', () => {
          expect(result).toBe(false)
        })
      })
    })
  })

  describe('generateUid()', () => {
    beforeEach(async () => {
      result = await service.generateUid()
    })

    it('returns valid UID', () => {
      expect((result as string)?.length).toBe(88)
    })
  })
})
