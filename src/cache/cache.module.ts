import { Module, CacheModule as NestJsCacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CacheConfig, cacheConfig } from './cache.config'
import {
  InternalCacheModule,
  InternalCacheStoreFactory,
} from './internal-cache'

@Module({
  imports: [
    NestJsCacheModule.registerAsync({
      imports: [ConfigModule.forFeature(cacheConfig), InternalCacheModule],
      useFactory: (
        { ttl }: CacheConfig,
        cacheStoreFactory: InternalCacheStoreFactory,
      ) => ({
        store: {
          create: (...args) => cacheStoreFactory.create(...args),
        },
        ttl,
      }),
      inject: [cacheConfig.KEY, InternalCacheStoreFactory],
    }),
  ],
  providers: [],
  exports: [NestJsCacheModule],
})
export class CacheModule {}
