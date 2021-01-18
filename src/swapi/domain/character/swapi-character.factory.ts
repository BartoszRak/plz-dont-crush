import { Injectable } from '@nestjs/common'

import { SwapiCharacterId } from '@main/swapi'
import { SwapiCharacter } from './swapi-character'
import {
  SwapiCharacterFilmsIds,
  SwapiCharacterName,
  SwapiCharacterPlanetId,
  SwapiCharacterSpeciesIds,
  SwapiCharacterStarshipsIds,
  SwapiCharacterVehiclesIds,
} from './swapi-character-values'
import { SwapiSpeciesId } from '../species/swapi-species-values'
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
export class SwapiCharacterFactory {
  create({
    id,
    name,
    filmsIds,
    speciesIds,
    vehiclesIds,
    starshipsIds,
    homeworldId,
  }: Input): SwapiCharacter {
    return new SwapiCharacter(
      new SwapiCharacterId(id),
      new SwapiCharacterName(name),
      new SwapiCharacterFilmsIds(filmsIds),
      new SwapiCharacterSpeciesIds(
        speciesIds.map(id => new SwapiSpeciesId(id)),
      ),
      new SwapiCharacterVehiclesIds(vehiclesIds.map(id => new VehicleId(id))),
      new SwapiCharacterStarshipsIds(starshipsIds),
      new SwapiCharacterPlanetId(homeworldId),
    )
  }
}
