import { SwapiSpecies } from "../domain/species/swapi-species";
import { SwapiSpeciesId } from "../domain/species/swapi-species-values";

export abstract class SpeciesManager {
  abstract getSpeciesById(id: SwapiSpeciesId): Promise<SwapiSpecies | undefined>

  abstract getMultipleSpeciesByIds(ids: SwapiSpeciesId[]): Promise<SwapiSpecies[]>
}
