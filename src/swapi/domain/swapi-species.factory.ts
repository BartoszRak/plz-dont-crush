import { Injectable } from '@nestjs/common'

import { SwapiSpecies } from './swapi-species'
import { SwapiSpeciesId, SwapiSpeciesName } from './swapi-species-values'

interface Input {
  id: number
  name: string
}

@Injectable()
export class SwapiSpeciesFactory {
  create({ id, name }: Input): SwapiSpecies {
    return new SwapiSpecies(new SwapiSpeciesId(id), new SwapiSpeciesName(name))
  }
}
