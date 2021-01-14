import * as Joi from 'joi'

export interface SwaggerConfigEnvs {
  SWAGGER_USER: string
  SWAGGER_PASSWORD: string
}

export const swaggerConfigValidationSchema: Record<
  keyof SwaggerConfigEnvs,
  Joi.Schema
> = {
  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),
}
