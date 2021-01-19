import { Character } from '@main/swapi/ports/character'
import { Vehicle } from '@main/swapi/ports/vehicle'
import { Provider } from '@nestjs/common'
import { DataService } from '../data/data.service'
import { CHARACTER_TOKEN } from '../people/character.provider'
import { VehiclesMockService } from './vehicles-mock.service'

export const VEHICLES_TOKEN = 'VEHICLES_TOKEN'

export const VehiclesProvider: Provider<Vehicle[]> = {
  provide: VEHICLES_TOKEN,
  useFactory: (
    vehiclesMockService: VehiclesMockService,
    character: Character,
    dataService: DataService,
  ) => {
    const characterId = dataService.extractIdFromUrl(character.url)
    const vehiclesIds = character.vehicles.map(vehicleUrl =>
      dataService.extractIdFromUrl(vehicleUrl),
    )
    return vehiclesIds.map(id =>
      vehiclesMockService.getVehicle(id, characterId),
    )
  },
  inject: [VehiclesMockService, CHARACTER_TOKEN, DataService],
}
