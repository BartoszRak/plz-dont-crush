import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ThirdPartyPort } from '../third-party-port'
import { NestExpressApplication } from '@nestjs/platform-express'
import { setupApplication } from './setup-application'
import { waitUntilFree } from 'tcp-port-used'

export async function bootstrapSwapi() {
  await waitUntilFree(ThirdPartyPort.Swapi)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  setupApplication(app)
  await app.listen(ThirdPartyPort.Swapi)
  return app
}
