import { Injectable } from '@nestjs/common'
import { Character, CharacterWithIds } from '../ports/character'
import { Species, SpeciesWithIds } from '../ports/species'

@Injectable()
export class DataTransformerService {
  extendCharacter(character: Character): CharacterWithIds {
    const characterWithId = this.addId(character)
    const { homeworld, species, vehicles, starships, films } = characterWithId
    return {
      ...characterWithId,
      homeworldId: this.extractIdFromUrl(homeworld),
      speciesIds: this.extractIdsFromMultipleUrls(species),
      vehiclesIds: this.extractIdsFromMultipleUrls(vehicles),
      starshipsIds: this.extractIdsFromMultipleUrls(starships),
      filmsIds: this.extractIdsFromMultipleUrls(films),
    }
  }

  extendSpecies(species: Species): SpeciesWithIds {
    const speciesWithId = this.addId(species)
    const { films, homeworld, people } = speciesWithId
    return {
      ...speciesWithId,
      planetId: this.extractIdFromUrl(homeworld),
      filmsIds: this.extractIdsFromMultipleUrls(films),
      charactersIds: this.extractIdsFromMultipleUrls(people),
    }
  }

  private addId<Data extends object & { url: string }>(
    data: Data,
  ): Data & { id: number } {
    return {
      ...data,
      id: this.extractIdFromUrl(data.url),
    }
  }

  private extractIdsFromMultipleUrls(urls: string[]): number[] {
    return urls.map(url => this.extractIdFromUrl(url))
  }

  private extractIdFromUrl(url: string): number {
    const splittedUrl = url.split('/')
    return Number(splittedUrl[splittedUrl.length - 2])
  }
}
