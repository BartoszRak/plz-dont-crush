import { Module } from '@nestjs/common'
import { DataModule } from './data/data.module'
import { PeopleModule } from './people/people.module'
import { VehiclesModule } from './vehicles/vehicles.module'

@Module({
  imports: [PeopleModule, DataModule, VehiclesModule],
})
export class AppModule {}
