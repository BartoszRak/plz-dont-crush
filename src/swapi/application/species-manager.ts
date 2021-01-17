import { Injectable } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { SpeciesManager as SpeciesManagerContract } from '../contract/species-manager'
import { SwapiSpecies } from '../domain/swapi-species'
import { SwapiSpeciesId } from '../domain/swapi-species-values'
import { SwapiSpeciesFactory } from '../domain/swapi-species.factory'
import { SpeciesRepository } from '../ports/species-repository'

@Injectable()
export class SpeciesManager implements SpeciesManagerContract {
  constructor(
    private readonly speciesRepository: SpeciesRepository,
    private readonly speciesFactory: SwapiSpeciesFactory,
  ) {}

  async getSpeciesById(id: SwapiSpeciesId): Promise<SwapiSpecies | undefined> {
    const species = await this.speciesRepository.getSpecies(id.value)
    return isDefined(species) ? this.speciesFactory.create(species) : undefined
  }
}
