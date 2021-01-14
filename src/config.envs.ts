import * as Joi from 'joi'
import {
  DatabaseConfigEnvs,
  databaseConfigValidationSchema,
} from './database-config'
import { SwaggerConfigEnvs, swaggerConfigValidationSchema } from './swagger'

export type ConfigsEnvs = DatabaseConfigEnvs & SwaggerConfigEnvs

export type EnvsValidationSchema = Record<keyof ConfigsEnvs, Joi.Schema>

export const envsValidationSchema: EnvsValidationSchema = {
  ...swaggerConfigValidationSchema,
  ...databaseConfigValidationSchema,
}
