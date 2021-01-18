import { SpeciesWithIds } from './species'

export abstract class SpeciesRepositoryPort {
  abstract getSpecies(id: number): Promise<SpeciesWithIds | undefined>

  abstract getManySpecies(ids: number[]): Promise<SpeciesWithIds[]>
}
