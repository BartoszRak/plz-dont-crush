import { CacheManagerOptions, Injectable } from '@nestjs/common'

import { CacheClient } from '../ports/cache-client'
import { InternalCacheStore } from './internal-cache-store'

@Injectable()
export class InternalCacheStoreFactory {
  constructor(private readonly cacheClient: CacheClient) {}

  create({ ttl }: Pick<CacheManagerOptions, 'ttl'>): InternalCacheStore {
    return new InternalCacheStore(this.cacheClient, { ttl })
  }
}
