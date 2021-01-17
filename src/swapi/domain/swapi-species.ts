import { plainToClass } from 'class-transformer'
import { SwapiSpeciesDto } from '../dto/swapi-species.dto'

import { SwapiSpeciesId, SwapiSpeciesName } from './swapi-species-values'

export class SwapiSpecies {
  constructor(readonly id: SwapiSpeciesId, readonly name: SwapiSpeciesName) {}

  toDto(): SwapiSpeciesDto {
    const plainDto: SwapiSpeciesDto = {
      id: this.id.value,
      name: this.name.value,
    }
    return plainToClass(SwapiSpeciesDto, plainDto)
  }
}
