import { HttpService, Inject, Injectable } from '@nestjs/common'

import { Vehicle, VehicleWithIds } from '@main/swapi/ports/vehicle'
import { VehiclesRepositoryPort } from '@main/swapi/ports/vehicles-repository.port'
import { isDefined } from '@main/utils'

import { DataTransformerService } from '../data-transformer.service'
import { HttpApiHelper } from '../http-api-helper.service'
import { swapiConfig, SwapiConfig } from '../swapi.config'

@Injectable()
export class VehiclesRepositoryAdapter implements VehiclesRepositoryPort {
  constructor(
    @Inject(swapiConfig.KEY) private readonly config: SwapiConfig,
    private readonly httpService: HttpService,
    private readonly dataTransformer: DataTransformerService,
    private readonly httpApiHelper: HttpApiHelper,
  ) {}

  async get(id: number): Promise<VehicleWithIds | undefined> {
    const response = await this.httpService
      .get<Vehicle>(`${this.config.baseUrl}/vehicles/${id}`)
      .toPromise()
    this.httpApiHelper.assertResponse(response)
    if (response.status === 404) {
      return undefined
    }
    return this.dataTransformer.extendVehicle(response.data)
  }

  async getMany(ids: number[]): Promise<VehicleWithIds[]> {
    const vehicles = await Promise.all(ids.map(id => this.get(id)))
    const filteredVehicles = vehicles.filter(isDefined)
    return filteredVehicles.map(notExtendedVehicle =>
      this.dataTransformer.extendVehicle(notExtendedVehicle),
    )
  }
}
