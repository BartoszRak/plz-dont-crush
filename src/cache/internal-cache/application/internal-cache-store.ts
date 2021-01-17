import { CacheStore, CacheStoreSetOptions } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { CacheClient } from '../ports/cache-client'

export class InternalCacheStore implements CacheStore {
  constructor(
    private readonly cacheClient: CacheClient,
    private readonly options: { ttl?: number },
  ) {}

  async set<T = string>(
    key: string,
    value: T,
    { ttl }: CacheStoreSetOptions<T> = this.options,
  ): Promise<void> {
    if (!isDefined(ttl)) {
      await this.cacheClient.set(key, `${value}`)
      return
    }
    const ttlInSeconds = typeof ttl === 'function' ? ttl(value) : ttl
    await this.cacheClient.set(key, `${value}`, ttlInSeconds * 1000)
    return
  }

  async get<T = string>(key: string): Promise<T | undefined> {
    return ((await this.cacheClient.get(key)) as unknown) as T
  }

  async del(key: string): Promise<void> {
    await this.cacheClient.del(key)
  }
}
