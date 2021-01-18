import { plainToClass } from 'class-transformer'

import { SwapiCharacterId } from '@main/swapi'

import { CharacterDto } from '../../dto/swapi-character.dto'
import {
  SwapiCharacterFilmsIds,
  SwapiCharacterPlanetId,
  SwapiCharacterName,
  SwapiCharacterSpeciesIds,
  SwapiCharacterStarshipsIds,
  SwapiCharacterVehiclesIds,
} from './swapi-character-values'
import { SwapiSpeciesId } from '../species/swapi-species-values'
import { VehicleId } from '../vehicle/vehicle-values'

export class SwapiCharacter {
  constructor(
    readonly id: SwapiCharacterId,
    readonly name: SwapiCharacterName,
    readonly filmsIds: SwapiCharacterFilmsIds,
    readonly speciesIds: SwapiCharacterSpeciesIds,
    readonly vehiclesIds: SwapiCharacterVehiclesIds,
    readonly starshipsIds: SwapiCharacterStarshipsIds,
    readonly planetId: SwapiCharacterPlanetId,
  ) {}

  isSpecies(speciesId: number): boolean {
    return this.speciesIds.value.map(({ value }) => value).includes(speciesId)
  }
  hasVehicle(vehicleId: number): boolean {
    return this.vehiclesIds.value.map(({ value }) => value).includes(vehicleId)
  }

  getAssignedSpecies(): SwapiSpeciesId[] {
    return this.speciesIds.value
  }

  getAssignedVehicles(): VehicleId[] {
    return this.vehiclesIds.value
  }

  toDto(): CharacterDto {
    const plainDto: CharacterDto = {
      id: this.id.value,
      name: this.name.value,
      planetId: this.planetId.value,
      filmsIds: this.filmsIds.value,
      speciesIds: this.speciesIds.value.map(({ value }) => value),
      vehiclesIds: this.vehiclesIds.value.map(({ value }) => value),
      starshipsIds: this.starshipsIds.value,
    }
    return plainToClass(CharacterDto, plainDto)
  }
}
