import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { createClient } from 'redis'
import { CacheClient } from '../ports/cache-client'
import { InMemoryCacheClient } from './clients/in-memory-cache-client'
import { RedisCacheClient } from './clients/redis-cache-client'
import { RedisConfig, redisConfig } from './redis.config'

@Module({
  imports: [ConfigModule.forFeature(redisConfig)],
  providers: [
    {
      provide: CacheClient,
      useFactory: ({ isTurnedOn, ...restOfRedisConfig }: RedisConfig) => {
        return isTurnedOn
          ? new RedisCacheClient(createClient(restOfRedisConfig))
          : new InMemoryCacheClient()
      },
      inject: [redisConfig.KEY],
    },
  ],
  exports: [CacheClient],
})
export class AdaptersModule {}
