import { SwapiCharacterId } from '@main/swapi'

import { plainToClass } from 'class-transformer'
import { SwapiCharacterDto } from '../dto/swapi-character.dto'
import { SwapiCharacterFilmsIds, SwapiCharacterPlanetId, SwapiCharacterName, SwapiCharacterSpeciesIds, SwapiCharacterStarshipsIds, SwapiCharacterVehiclesIds } from './swapi-character-values'

export class SwapiCharacter {
  constructor(
    readonly id: SwapiCharacterId,
    readonly name: SwapiCharacterName,
    readonly filmsIds: SwapiCharacterFilmsIds,
    readonly speciesIds: SwapiCharacterSpeciesIds,
    readonly vehiclesIds: SwapiCharacterVehiclesIds,
    readonly starshipsIds: SwapiCharacterStarshipsIds,
    readonly planetId: SwapiCharacterPlanetId
  ) {}

  toDto(): SwapiCharacterDto {
    const plainDto: SwapiCharacterDto = {
      id: this.id.value,
      name: this.name.value,
      planetId: this.planetId.value,
      filmsIds: this.filmsIds.value,
      speciesIds: this.speciesIds.value,
      vehiclesIds: this.vehiclesIds.value,
      starshipsIds: this.starshipsIds.value,
    }
    return plainToClass(SwapiCharacterDto, plainDto)
  }
}
