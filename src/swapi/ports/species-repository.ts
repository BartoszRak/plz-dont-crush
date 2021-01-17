import { SpeciesWithIds } from './species'

export abstract class SpeciesRepository {
  abstract getSpecies(id: number): Promise<SpeciesWithIds | undefined>
}
