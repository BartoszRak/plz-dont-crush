import { RedisClient } from 'redis'
import { promisify } from 'util'

import { isDefined } from '@main/utils'

import { CacheClient } from '../../ports/cache-client'

export class RedisCacheClient implements CacheClient {
  private readonly expiringSaveIntoCache: (
    key: string,
    value: string,
    durationInMs: number,
  ) => Promise<unknown>
  private readonly saveIntoCache: (
    key: string,
    value: string,
  ) => Promise<unknown>
  private readonly deleteFromCache: (key: string) => Promise<unknown>
  private readonly getFromCache: (key: string) => Promise<string | null>

  constructor(private readonly redisClient: RedisClient) {
    this.expiringSaveIntoCache = promisify(
      (key: string, value: string, duration: number, ...restOfArgs: any[]) =>
        redisClient.set(key, value, 'PX', duration, ...restOfArgs),
    ).bind(redisClient)
    this.saveIntoCache = promisify(redisClient.set).bind(redisClient)
    this.getFromCache = promisify(redisClient.get).bind(redisClient)
    this.deleteFromCache = promisify(redisClient.del).bind(redisClient)
  }

  set(key: string, payload: string, expirationInMs?: number): Promise<boolean> {
    return (isDefined(expirationInMs)
      ? this.expiringSaveIntoCache(key, payload, expirationInMs)
      : this.saveIntoCache(key, payload)
    )
      .then((res: unknown) => res === 'OK')
      .catch(() => false)
  }

  async get(key: string): Promise<string | undefined> {
    const value = await this.getFromCache(key)
    return isDefined(value) ? value : undefined
  }

  del(key: string): Promise<boolean> {
    return this.deleteFromCache(key)
      .then(() => true)
      .catch(() => false)
  }

  end(): boolean {
    this.redisClient.end(false)
    return true
  }
}
