import { CacheManagerOptions, Injectable } from '@nestjs/common'

import { CacheClient } from '../ports/cache-client'
import { CacheDataManipulatorService } from './cache-data-manipulator.service'
import { InternalCacheStore } from './internal-cache-store'

@Injectable()
export class InternalCacheStoreFactory {
  constructor(
    private readonly cacheClient: CacheClient,
    private readonly dataManipulator: CacheDataManipulatorService,
  ) {}

  create({ ttl }: Pick<CacheManagerOptions, 'ttl'>): InternalCacheStore {
    return new InternalCacheStore(this.cacheClient, this.dataManipulator, {
      ttl,
    })
  }
}
