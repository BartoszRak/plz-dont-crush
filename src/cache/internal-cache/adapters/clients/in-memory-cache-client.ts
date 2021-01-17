import { isDefined } from '@main/utils'

import { CacheClient } from '../../ports/cache-client'

interface Value {
  expirationDateInMs?: number
  data: string
}

export class InMemoryCacheClient implements CacheClient {
  private memory: Record<string, Value> = {}

  private deleteAllExpiredValues() {
    Object.entries(this.memory).forEach(([key, value]) => {
      if (
        isDefined(value.expirationDateInMs) &&
        value.expirationDateInMs <= Date.now()
      ) {
        delete this.memory[key]
      }
    })
  }

  async set(
    key: string,
    payload: string,
    expirationInMs?: number,
  ): Promise<boolean> {
    this.memory[key] = {
      expirationDateInMs: isDefined(expirationInMs)
        ? Date.now() + expirationInMs
        : undefined,
      data: payload,
    }
    return true
  }

  async get(key: string) {
    this.deleteAllExpiredValues()
    return isDefined(this.memory[key]) ? this.memory[key].data : undefined
  }

  async del(key: string): Promise<boolean> {
    if (this.memory[key]) {
      delete this.memory[key]
    }
    return true
  }

  end() {
    return true
  }
}
