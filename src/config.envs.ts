import * as Joi from 'joi'
import {
  RedisConfigEnvs,
  redisConfigValidationSchema,
} from './cache/internal-cache/adapters/redis.config'
import {
  CacheConfigEnvs,
  cacheConfigValidationSchema,
} from './cache/cache.config'

import {
  DatabaseConfigEnvs,
  databaseConfigValidationSchema,
} from './database-config'
import { SwaggerConfigEnvs, swaggerConfigValidationSchema } from './swagger'
import {
  SwapiConfigEnvs,
  swapiConfigValidationSchema,
} from './swapi/adapters/swapi.config'

export type ConfigsEnvs = DatabaseConfigEnvs &
  SwaggerConfigEnvs &
  SwapiConfigEnvs &
  RedisConfigEnvs &
  CacheConfigEnvs

export type EnvsValidationSchema = Record<keyof ConfigsEnvs, Joi.Schema>

export const envsValidationSchema: EnvsValidationSchema = {
  ...swaggerConfigValidationSchema,
  ...databaseConfigValidationSchema,
  ...swapiConfigValidationSchema,
  ...redisConfigValidationSchema,
  ...cacheConfigValidationSchema,
}
