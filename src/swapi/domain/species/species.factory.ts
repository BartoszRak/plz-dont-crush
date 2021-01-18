import { Injectable } from '@nestjs/common'

import { Species } from './species'
import { SpeciesId, SpeciesName } from './species-values'

interface Input {
  id: number
  name: string
}

@Injectable()
export class SpeciesFactory {
  create({ id, name }: Input): Species {
    return new Species(new SpeciesId(id), new SpeciesName(name))
  }
}
