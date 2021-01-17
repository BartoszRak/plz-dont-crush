import { CacheStore, CacheStoreSetOptions } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { CacheClient } from '../ports/cache-client'
import { CacheDataManipulatorService } from './cache-data-manipulator.service'

export class InternalCacheStore implements CacheStore {
  constructor(
    private readonly cacheClient: CacheClient,
    private readonly dataManipulator: CacheDataManipulatorService,
    private readonly options: { ttl?: number },
  ) {}

  async set<T = string>(
    key: string,
    value: T,
    { ttl }: CacheStoreSetOptions<T> = this.options,
  ): Promise<void> {
    if (!this.dataManipulator.isCacheableValue(value)) {
      throw new Error(`Value "${value}" is not cacheable.`)
    }
    const preparedValue = this.dataManipulator.prepareJson(value)
    if (!isDefined(ttl)) {
      await this.cacheClient.set(key, preparedValue)
      return
    }
    const ttlInSeconds = typeof ttl === 'function' ? ttl(value) : ttl
    await this.cacheClient.set(key, preparedValue, ttlInSeconds * 1000)
    return
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this.cacheClient.get(key)
    return isDefined(value)
      ? this.dataManipulator.readJson<T>(value)
      : undefined
  }

  async del(key: string): Promise<void> {
    await this.cacheClient.del(key)
  }
}
