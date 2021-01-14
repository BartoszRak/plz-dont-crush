import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as basicAuth from 'express-basic-auth'

import { SwaggerConfigEnvs } from './swagger.config'

export enum ApiTag {
  Auth = 'auth',
}

export const setupSwagger = (app: NestExpressApplication): void => {
  const isProduction = process.env.NODE_ENV === 'production'

  let options = new DocumentBuilder()
    .setTitle('Plz dont crush API')
    .setDescription('Plz dont crush API documentation.')
    .setVersion('1.0')
  Object.values(ApiTag).forEach(apiTag => options.addTag(apiTag))
  const buildOptions = options.build()
  const document = SwaggerModule.createDocument(app, buildOptions)

  if (isProduction) {
    const envs = (process.env as unknown) as SwaggerConfigEnvs
    app.use(
      '/api',
      basicAuth({
        challenge: true,
        users: {
          [envs.SWAGGER_USER]: envs.SWAGGER_PASSWORD,
        },
      }),
    )
  }

  SwaggerModule.setup('api', app, document)
}
