import * as Joi from 'joi'

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
  SwapiConfigEnvs

export type EnvsValidationSchema = Record<keyof ConfigsEnvs, Joi.Schema>

export const envsValidationSchema: EnvsValidationSchema = {
  ...swaggerConfigValidationSchema,
  ...databaseConfigValidationSchema,
  ...swapiConfigValidationSchema,
}
