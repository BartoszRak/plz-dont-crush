import { Module } from '@nestjs/common'
import { VehiclesMockService } from './vehicles-mock.service'
import { PeopleModule } from '../people/people.module'
import { VehiclesController } from './vehicles.controller'
import { VehiclesProvider } from './vehicles.provider'

@Module({
  imports: [PeopleModule],
  controllers: [VehiclesController],
  providers: [VehiclesMockService, VehiclesProvider],
})
export class VehiclesModule {}
