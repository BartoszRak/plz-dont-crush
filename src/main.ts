import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { setupApplication } from './setup-application'
import { setupSwagger } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  setupApplication(app)
  setupSwagger(app)
  await app.listen(3000)
}
bootstrap()
