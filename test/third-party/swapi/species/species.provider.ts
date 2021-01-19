import { Character } from '@main/swapi/ports/character'
import { Species } from '@main/swapi/ports/species'
import { Provider } from '@nestjs/common'
import { DataService } from '../data/data.service'
import { CHARACTER_TOKEN } from '../people/character.provider'
import { SpeciesMockService } from './species-mock.service'

export const SPECIES_TOKEN = 'SPECIES_TOKEN'

export const SpeciesProvider: Provider<Species[]> = {
  provide: SPECIES_TOKEN,
  useFactory: (
    speciesMockService: SpeciesMockService,
    character: Character,
    dataService: DataService,
  ) => {
    const characterId = dataService.extractIdFromUrl(character.url)
    const speciesIds = character.species.map(speciesUrl =>
      dataService.extractIdFromUrl(speciesUrl),
    )
    return speciesIds.map(id => speciesMockService.getSpecies(id, characterId))
  },
  inject: [SpeciesMockService, CHARACTER_TOKEN, DataService],
}
