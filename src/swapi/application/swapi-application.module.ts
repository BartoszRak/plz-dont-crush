import { Module } from '@nestjs/common'

import { SwapiAdaptersModule } from '../adapters/swapi-adapters.module'
import { CharactersManager as CharactersManagerContract } from '../contract/characters-manager'
import { SpeciesManager as SpeciesManagerContract } from '../contract/species-manager'
import { VehiclesManager as VehiclesManagerContract } from '../contract/vehicles-manager'
import { CharacterFactory } from '../domain/character/character.factory'
import { SpeciesFactory } from '../domain/species/species.factory'
import { VehicleFactory } from '../domain/vehicle/vehicle.factory'
import { CharactersManager } from './characters-manager'
import { SpeciesManager } from './species-manager'
import { VehiclesManager } from './vehicles-manager'

@Module({
  imports: [SwapiAdaptersModule],
  providers: [
    CharacterFactory,
    SpeciesFactory,
    VehicleFactory,
    {
      provide: CharactersManagerContract,
      useClass: CharactersManager,
    },
    {
      provide: SpeciesManagerContract,
      useClass: SpeciesManager,
    },
    {
      provide: VehiclesManagerContract,
      useClass: VehiclesManager,
    },
  ],
  exports: [CharactersManagerContract, SpeciesManagerContract, VehiclesManagerContract],
})
export class SwapiApplicationModule {}
