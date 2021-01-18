import { VehicleWithIds } from './vehicle'

export abstract class VehiclesRepositoryPort {
  abstract get(id: number): Promise<VehicleWithIds | undefined>

  abstract getMany(ids: number[]): Promise<VehicleWithIds[]>
}
