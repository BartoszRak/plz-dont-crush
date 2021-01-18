import { VehicleDto } from '../../dto/vehicle.dto'
import { plainToClass } from 'class-transformer'
import {
  VehicleId,
  VehicleModel,
  VehicleName,
} from './vehicle-values'

export class Vehicle {
  constructor(
    readonly id: VehicleId,
    readonly name: VehicleName,
    readonly model: VehicleModel,
  ) {}

  toDto(): VehicleDto {
    const plainDto: VehicleDto = {
      id: this.id.value,
      name: this.name.value,
      model: this.model.value,
    }
    return plainToClass(VehicleDto, plainDto)
  }
}
