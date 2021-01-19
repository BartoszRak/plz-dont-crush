import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { ThirdPartyPort } from '../third-party-port'
import { setupApplication } from './setup-application'
import { waitUntilFree } from 'tcp-port-used'

export async function bootstrapSwapi() {
  await waitUntilFree(ThirdPartyPort.Swapi)
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  })
  setupApplication(app)
  await app.listen(ThirdPartyPort.Swapi)
  return app
}
