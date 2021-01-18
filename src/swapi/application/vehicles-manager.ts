import { Injectable } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { VehiclesManager as VehiclesManagerContract } from '../contract/vehicles-manager'
import { VehicleFactory } from '../domain/vehicle/vehicle.factory'
import { VehiclesRepository } from '../ports/vehicles-repository'
import { VehicleId } from '../domain/vehicle/vehicle-values'
import { Vehicle } from '../domain/vehicle/vehicle'

@Injectable()
export class VehiclesManager implements VehiclesManagerContract {
  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly vehicleFactory: VehicleFactory,
  ) {}

  async getVehicleById(id: VehicleId): Promise<Vehicle | undefined> {
    const vehicle = await this.vehiclesRepository.get(id.value)
    return isDefined(vehicle) ? this.vehicleFactory.create(vehicle) : undefined
  }

  async getMultipleVehiclesByIds(ids: VehicleId[]): Promise<Vehicle[]> {
    const rawIds = ids.map(id => id.value)
    const vehicles = await this.vehiclesRepository.getMany(rawIds)
    return vehicles.map(speciesProperties =>
      this.vehicleFactory.create(speciesProperties),
    )
  }
}
