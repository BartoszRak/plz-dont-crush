import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export enum ApiTag {
  Auth = 'auth',
}

export const setupSwagger = (app: NestExpressApplication): void => {
  let options = new DocumentBuilder()
    .setTitle('Plz dont crush API')
    .setDescription('Plz dont crush API documentation.')
    .setVersion('1.0')
  Object.values(ApiTag).forEach(apiTag => options.addTag(apiTag))
  const builtOptions = options.build()
  const document = SwaggerModule.createDocument(app, builtOptions)
  SwaggerModule.setup('api', app, document)
}
