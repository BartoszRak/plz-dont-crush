import { registerAs } from '@nestjs/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import * as Joi from 'joi'

export type DatabaseConfig = PostgresConnectionOptions

export interface DatabaseConfigEnvs {
  DB_TYPE: string
  DB_HOST: string
  DB_PORT: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_NAME: string
  DB_LOGGING: string
  DB_SYNCHRONIZE: string
}

export const databaseConfigValidationSchema: Record<
  keyof DatabaseConfigEnvs,
  Joi.Schema
> = {
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_LOGGING: Joi.number().required(),
  DB_SYNCHRONIZE: Joi.number().required(),
}

const rawDatabaseConfig = (): DatabaseConfig => {
  const envs: DatabaseConfigEnvs = (process.env as unknown) as DatabaseConfigEnvs
  return {
    type: envs.DB_TYPE as 'postgres',
    host: envs.DB_HOST,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    port: parseInt(envs.DB_PORT, 10),
    url: `postgres://${envs.DB_USERNAME}:${envs.DB_PASSWORD}@${envs.DB_HOST}:${envs.DB_PORT}/${envs.DB_NAME}`,
    entities: [__dirname + '/../**/**/!(*.d).entity.{ts,js}'],
    logging: Boolean(parseInt(envs.DB_LOGGING, 10)),
    synchronize: Boolean(parseInt(envs.DB_SYNCHRONIZE, 10)),
  }
}

export const databaseConfig = registerAs('database', rawDatabaseConfig)
