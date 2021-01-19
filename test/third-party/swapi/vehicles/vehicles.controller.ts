import { SwapiPaginatedResponse } from '@main/swapi/ports/swapi-paginated-response.type'
import { Vehicle } from '@main/swapi/ports/vehicle'
import { isDefined } from '@main/utils'
import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { DataService } from '../data/data.service'
import { VEHICLES_TOKEN } from './vehicles.provider'

@Controller('vehicles')
export class VehiclesController {
  constructor(
    @Inject(VEHICLES_TOKEN) private readonly vehicles: Vehicle[],
    private readonly dataService: DataService,
  ) {}

  @Get(':id')
  async getSingleVehicle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vehicle> {
    const foundVehicle = this.vehicles.find(
      ({ url }) => this.dataService.extractIdFromUrl(url) === id,
    )
    if (!isDefined(foundVehicle)) {
      throw new NotFoundException()
    }
    return foundVehicle
  }

  @Get()
  async getMultipleVehicles(): Promise<SwapiPaginatedResponse<Vehicle[]>> {
    return {
      count: this.vehicles.length,
      next: null,
      previous: null,
      results: this.vehicles,
    }
  }
}
