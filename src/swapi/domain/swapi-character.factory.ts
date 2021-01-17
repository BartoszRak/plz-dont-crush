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
import { SwapiSpeciesId } from './swapi-species-values'

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
      new SwapiCharacterVehiclesIds(vehiclesIds),
      new SwapiCharacterStarshipsIds(starshipsIds),
      new SwapiCharacterPlanetId(homeworldId),
    )
  }
}
