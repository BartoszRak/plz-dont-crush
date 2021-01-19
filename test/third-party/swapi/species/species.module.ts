import { Module } from '@nestjs/common'
import { PeopleModule } from '../people/people.module'
import { SpeciesMockService } from './species-mock.service'
import { SpeciesController } from './species.controller'
import { SpeciesProvider } from './species.provider'

@Module({
  imports: [PeopleModule],
  controllers: [SpeciesController],
  providers: [SpeciesMockService, SpeciesProvider],
})
export class SpeciesModule {}
