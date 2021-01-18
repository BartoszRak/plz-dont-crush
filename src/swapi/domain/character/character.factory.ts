import { Injectable } from '@nestjs/common'

import { CharacterId } from '@main/swapi'
import { Character } from './character'
import {
  CharacterFilmsIds,
  CharacterName,
  CharacterPlanetId,
  CharacterSpeciesIds,
  CharacterStarshipsIds,
  CharacterVehiclesIds,
} from './character-values'
import { SpeciesId } from '../species/species-values'
import { VehicleId } from '../vehicle/vehicle-values'

interface Input {
  id: number
  name: string
  filmsIds: number[]
  speciesIds: number[]
  vehiclesIds: number[]
  starshipsIds: number[]
  homeworldId: number
}

@Injectable()
export class CharacterFactory {
  create({
    id,
    name,
    filmsIds,
    speciesIds,
    vehiclesIds,
    starshipsIds,
    homeworldId,
  }: Input): Character {
    return new Character(
      new CharacterId(id),
      new CharacterName(name),
      new CharacterFilmsIds(filmsIds),
      new CharacterSpeciesIds(
        speciesIds.map(id => new SpeciesId(id)),
      ),
      new CharacterVehiclesIds(vehiclesIds.map(id => new VehicleId(id))),
      new CharacterStarshipsIds(starshipsIds),
      new CharacterPlanetId(homeworldId),
    )
  }
}
