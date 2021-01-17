import { SwapiSpecies } from "../domain/swapi-species";
import { SwapiSpeciesId } from "../domain/swapi-species-values";

export abstract class SpeciesManager {
  abstract getSpeciesById(id: SwapiSpeciesId): Promise<SwapiSpecies | undefined>

  abstract getMultipleSpeciesByIds(ids: SwapiSpeciesId[]): Promise<SwapiSpecies[]>
}
