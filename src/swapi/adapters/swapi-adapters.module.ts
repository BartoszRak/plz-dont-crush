import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CharacterRepositoryPort } from '../ports/character-repository.port'
import { SpeciesRepositoryPort } from '../ports/species-repository.port'
import { VehiclesRepositoryPort } from '../ports/vehicles-repository.port'
import { DataTransformerService } from './data-transformer.service'
import { HttpApiHelper } from './http-api-helper.service'
import { VehiclesRepositoryAdapter } from './repositories/vehicles-repository.adapter'
import { CharacterRepositoryAdapter } from './repositories/character-repository.adapter'
import { SpeciesRepositoryAdapter } from './repositories/species-repository.adapter'
import { swapiConfig } from './swapi.config'

@Module({
  imports: [HttpModule, ConfigModule.forFeature(swapiConfig)],
  providers: [
    HttpApiHelper,
    DataTransformerService,
    {
      provide: CharacterRepositoryPort,
      useClass: CharacterRepositoryAdapter,
    },
    {
      provide: SpeciesRepositoryPort,
      useClass: SpeciesRepositoryAdapter,
    },
    {
      provide: VehiclesRepositoryPort,
      useClass: VehiclesRepositoryAdapter,
    },
  ],
  exports: [CharacterRepositoryPort, SpeciesRepositoryPort, VehiclesRepositoryPort],
})
export class SwapiAdaptersModule {}
