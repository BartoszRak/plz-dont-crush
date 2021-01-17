import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'
import { ClientOpts } from 'redis'

export type RedisConfig = Pick<
  ClientOpts,
  'db' | 'password' | 'host' | 'port'
> & {
  isTurnedOn: boolean
}

export interface RedisConfigEnvs {
  REDIS_PORT: string
  REDIS_PASSWORD: string
  REDIS_DB: string
  REDIS_HOST: string
  REDIS_ON: string
}

export const redisConfigValidationSchema: Record<
  keyof RedisConfigEnvs,
  Joi.Schema
> = {
  REDIS_ON: Joi.number().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_DB: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
}

const rawRedisConfig = (): RedisConfig => {
  const envs: RedisConfigEnvs = (process.env as unknown) as RedisConfigEnvs
  return {
    db: envs.REDIS_DB,
    host: envs.REDIS_HOST,
    password: envs.REDIS_PASSWORD,
    port: Number(envs.REDIS_PORT),
    isTurnedOn: envs.REDIS_ON === '1',
  }
}

export const redisConfig = registerAs('redis', rawRedisConfig)
