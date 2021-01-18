import { VehicleWithIds } from './vehicle'

export abstract class VehiclesRepository {
  abstract get(id: number): Promise<VehicleWithIds | undefined>

  abstract getMany(ids: number[]): Promise<VehicleWithIds[]>
}
