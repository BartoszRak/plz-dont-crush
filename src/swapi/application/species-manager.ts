import { Injectable } from '@nestjs/common'

import { isDefined } from '@main/utils'

import { SpeciesManager as SpeciesManagerContract } from '../contract/species-manager'
import { Species } from '../domain/species/species'
import { SpeciesId } from '../domain/species/species-values'
import { SpeciesFactory } from '../domain/species/species.factory'
import { SpeciesRepositoryPort } from '../ports/species-repository.port'

@Injectable()
export class SpeciesManager implements SpeciesManagerContract {
  constructor(
    private readonly speciesRepository: SpeciesRepositoryPort,
    private readonly speciesFactory: SpeciesFactory,
  ) {}

  async getSpeciesById(id: SpeciesId): Promise<Species | undefined> {
    const species = await this.speciesRepository.getSpecies(id.value)
    return isDefined(species) ? this.speciesFactory.create(species) : undefined
  }

  async getMultipleSpeciesByIds(
    ids: SpeciesId[],
  ): Promise<Species[]> {
    const rawIds = ids.map(id => id.value)
    const species = await this.speciesRepository.getManySpecies(rawIds)
    return species.map(speciesProperties =>
      this.speciesFactory.create(speciesProperties),
    )
  }
}
