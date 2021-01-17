import { Module } from '@nestjs/common'

import { SwapiAdaptersModule } from '../adapters/swapi-adapters.module'
import { CharactersManager as CharactersManagerContract } from '../contract/characters-manager'
import { SpeciesManager as SpeciesManagerContract } from '../contract/species-manager'
import { SwapiCharacterFactory } from '../domain/swapi-character.factory'
import { SwapiSpeciesFactory } from '../domain/swapi-species.factory'
import { CharactersManager } from './characters-manager'
import { SpeciesManager } from './species-manager'

@Module({
  imports: [SwapiAdaptersModule],
  providers: [
    SwapiCharacterFactory,
    SwapiSpeciesFactory,
    {
      provide: CharactersManagerContract,
      useClass: CharactersManager,
    },
    {
      provide: SpeciesManagerContract,
      useClass: SpeciesManager,
    },
  ],
  exports: [CharactersManagerContract, SpeciesManagerContract],
})
export class SwapiApplicationModule {}
