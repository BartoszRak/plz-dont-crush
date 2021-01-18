import { plainToClass } from 'class-transformer'
import { SpeciesDto } from '../../dto/swapi-species.dto'

import { SpeciesId, SpeciesName } from './species-values'

export class Species {
  constructor(readonly id: SpeciesId, readonly name: SpeciesName) {}

  toDto(): SpeciesDto {
    const plainDto: SpeciesDto = {
      id: this.id.value,
      name: this.name.value,
    }
    return plainToClass(SpeciesDto, plainDto)
  }
}
