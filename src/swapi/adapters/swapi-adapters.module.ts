import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CharacterRepository } from '../ports/character-repository'
import { SpeciesRepository } from '../ports/species-repository'
import { VehiclesRepository } from '../ports/vehicles-repository'
import { DataTransformerService } from './data-transformer.service'
import { HttpApiHelper } from './http-api-helper.service'
import { SwapiVehiclesRepository } from './repositories/swapi-vehicles-repository'
import { SwapiCharacterRepository } from './repositories/swapi-character-repository'
import { SwapiSpeciesRepository } from './repositories/swapi-species-repository'
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
    {
      provide: VehiclesRepository,
      useClass: SwapiVehiclesRepository,
    },
  ],
  exports: [CharacterRepository, SpeciesRepository, VehiclesRepository],
})
export class SwapiAdaptersModule {}
