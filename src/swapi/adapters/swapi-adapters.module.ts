import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CharacterRepository } from '../ports/character-repository'
import { DataTransformerService } from './data-transformer.service'
import { SwapiCharacterRepository } from './swapi-character-repository'
import { swapiConfig } from './swapi.config'

@Module({
  imports: [HttpModule, ConfigModule.forFeature(swapiConfig)],
  providers: [
    DataTransformerService,
    {
      provide: CharacterRepository,
      useClass: SwapiCharacterRepository,
    },
  ],
  exports: [CharacterRepository],
})
export class SwapiAdaptersModule {}
