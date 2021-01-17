import { Module } from '@nestjs/common'
import { SwapiApplicationModule } from './application/swapi-application.module'

@Module({
  imports: [SwapiApplicationModule],
  exports: [SwapiApplicationModule],
})
export class SwapiModule {}
