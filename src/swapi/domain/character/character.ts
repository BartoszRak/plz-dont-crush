import { plainToClass } from 'class-transformer'

import { CharacterId } from '@main/swapi'

import { CharacterDto } from '../../dto/swapi-character.dto'
import {
  CharacterFilmsIds,
  CharacterPlanetId,
  CharacterName,
  CharacterSpeciesIds,
  CharacterStarshipsIds,
  CharacterVehiclesIds,
} from './character-values'
import { SpeciesId } from '../species/species-values'
import { VehicleId } from '../vehicle/vehicle-values'

export class Character {
  constructor(
    readonly id: CharacterId,
    readonly name: CharacterName,
    readonly filmsIds: CharacterFilmsIds,
    readonly speciesIds: CharacterSpeciesIds,
    readonly vehiclesIds: CharacterVehiclesIds,
    readonly starshipsIds: CharacterStarshipsIds,
    readonly planetId: CharacterPlanetId,
  ) {}

  isSpecies(speciesId: number): boolean {
    return this.speciesIds.value.map(({ value }) => value).includes(speciesId)
  }
  hasVehicle(vehicleId: number): boolean {
    return this.vehiclesIds.value.map(({ value }) => value).includes(vehicleId)
  }

  getAssignedSpecies(): SpeciesId[] {
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
