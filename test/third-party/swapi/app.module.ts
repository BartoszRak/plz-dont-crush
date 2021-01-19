import { Module } from '@nestjs/common'
import { DataModule } from './data/data.module'
import { PeopleModule } from './people/people.module'
import { SpeciesModule } from './species/species.module'
import { VehiclesModule } from './vehicles/vehicles.module'

@Module({
  imports: [PeopleModule, DataModule, VehiclesModule, SpeciesModule],
})
export class AppModule {}
