import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export interface CacheConfig {
  ttl: number
}

export interface CacheConfigEnvs {
  CACHE_TTL: string
 
}

export const cacheConfigValidationSchema: Record<
  keyof CacheConfigEnvs,
  Joi.Schema
> = {
  CACHE_TTL: Joi.number().required(),
}

const rawCacheConfig = (): CacheConfig => {
  const envs: CacheConfigEnvs = (process.env as unknown) as CacheConfigEnvs
  return {
    ttl: Number(envs.CACHE_TTL)
  }
}

export const cacheConfig = registerAs('cache', rawCacheConfig)
