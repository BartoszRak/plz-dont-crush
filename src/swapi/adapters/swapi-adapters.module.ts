import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CharacterRepository } from '../ports/character-repository'
import { SpeciesRepository } from '../ports/species-repository'
import { DataTransformerService } from './data-transformer.service'
import { HttpApiHelper } from './http-api-helper.service'
import { SwapiCharacterRepository } from './swapi-character-repository'
import { SwapiSpeciesRepository } from './swapi-species-repository'
import { swapiConfig } from './swapi.config'

@Module({
  imports: [HttpModule, ConfigModule.forFeature(swapiConfig)],
  providers: [
    HttpApiHelper,
    DataTransformerService,
    {
      provide: CharacterRepository,
      useClass: SwapiCharacterRepository,
    },
    {
      provide: SpeciesRepository,
      useClass: SwapiSpeciesRepository,
    },
  ],
  exports: [CharacterRepository, SpeciesRepository],
})
export class SwapiAdaptersModule {}
