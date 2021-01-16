import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export interface SwapiConfig {
  baseUrl: string
}

export interface SwapiConfigEnvs {
  SWAPI_BASE_URL: string
}

export const swapiConfigValidationSchema: Record<
  keyof SwapiConfigEnvs,
  Joi.Schema
> = {
  SWAPI_BASE_URL: Joi.string().required(),
}

const rawSwapiConfig = (): SwapiConfig => {
  const envs: SwapiConfigEnvs = (process.env as unknown) as SwapiConfigEnvs
  return {
    baseUrl: envs.SWAPI_BASE_URL,
  }
}

export const swapiConfig = registerAs('swapi', rawSwapiConfig)
