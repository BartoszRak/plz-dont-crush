import { Vehicle } from './vehicle'
import { Injectable } from '@nestjs/common'
import { VehicleId, VehicleModel, VehicleName } from './vehicle-values'

interface Input {
  id: number
  name: string
  model: string
}

@Injectable()
export class VehicleFactory {
  create({ id, name, model }: Input): Vehicle {
    return new Vehicle(
      new VehicleId(id),
      new VehicleName(name),
      new VehicleModel(model),
    )
  }
}
