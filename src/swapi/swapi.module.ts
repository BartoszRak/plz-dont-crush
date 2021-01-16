import { Module } from '@nestjs/common'
import { AdaptersModule } from './adapters'
import { SwapiService } from './swapi.service'

@Module({
  imports: [AdaptersModule],
  providers: [SwapiService],
  exports: [SwapiService]
})
export class SwapiModule {}
