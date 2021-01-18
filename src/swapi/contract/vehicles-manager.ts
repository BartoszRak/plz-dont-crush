import { Vehicle } from '../domain/vehicle/vehicle';
import { VehicleId } from '../domain/vehicle/vehicle-values'

export abstract class VehiclesManager {
  abstract getVehicleById(id: VehicleId): Promise<Vehicle | undefined>

  abstract getMultipleVehiclesByIds(ids: VehicleId[]): Promise<Vehicle[]>
}
