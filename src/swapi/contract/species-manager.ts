import { Species } from "../domain/species/species";
import { SpeciesId } from "../domain/species/species-values";

export abstract class SpeciesManager {
  abstract getSpeciesById(id: SpeciesId): Promise<Species | undefined>

  abstract getMultipleSpeciesByIds(ids: SpeciesId[]): Promise<Species[]>
}
