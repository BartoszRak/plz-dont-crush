import * as Joi from 'joi'
import {
  DatabaseConfigEnvs,
  databaseConfigValidationSchema,
} from './database-config'

export type ConfigsEnvs = DatabaseConfigEnvs

export type EnvsValidationSchema = Record<keyof ConfigsEnvs, Joi.Schema>

export const envsValidationSchema: EnvsValidationSchema = {
  ...databaseConfigValidationSchema,
}
