import { Module } from '@nestjs/common'

import { SwapiAdaptersModule } from '../adapters/swapi-adapters.module'
import { CharactersManager as CharactersManagerContract } from '../contract/characters-manager'
import { SwapiCharacterFactory } from '../domain/swapi-character.factory'
import { CharactersManager } from './characters-manager'

@Module({
  imports: [SwapiAdaptersModule],
  providers: [
    SwapiCharacterFactory,
    {
      provide: CharactersManagerContract,
      useClass: CharactersManager,
    },
  ],
  exports: [CharactersManagerContract],
})
export class SwapiApplicationModule {}
