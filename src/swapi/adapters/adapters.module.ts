import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SwapiRepository } from '../ports/swapi-repository'
import { DataTransformerService } from './data-transformer.service'
import { Repository } from './repository'
import { swapiConfig } from './swapi.config'

@Module({
  imports: [HttpModule, ConfigModule.forFeature(swapiConfig)],
  providers: [
    DataTransformerService,
    {
      provide: SwapiRepository,
      useClass: Repository,
    },
  ],
  exports: [SwapiRepository],
})
export class AdaptersModule {}
