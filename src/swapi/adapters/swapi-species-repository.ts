import { HttpService, Inject, Injectable } from '@nestjs/common'

import { DataTransformerService } from './data-transformer.service'
import { SwapiConfig, swapiConfig } from './swapi.config'
import { SpeciesRepository } from '../ports/species-repository'
import { Species, SpeciesWithIds } from '../ports/species'
import { HttpApiHelper } from './http-api-helper.service'

@Injectable()
export class SwapiSpeciesRepository implements SpeciesRepository {
  constructor(
    @Inject(swapiConfig.KEY) private readonly config: SwapiConfig,
    private readonly httpService: HttpService,
    private readonly dataTransformer: DataTransformerService,
    private readonly httpApiHelper: HttpApiHelper,
  ) {}

  async getSpecies(id: number): Promise<SpeciesWithIds | undefined> {
    const response = await this.httpService
      .get<Species>(`${this.config.baseUrl}/species/${id}`)
      .toPromise()
    this.httpApiHelper.assertRequest(
      response,
      'Unknown error when getting character.',
    )
    if (response.status === 404) {
      return undefined
    }
    return this.dataTransformer.extendSpecies(response.data)
  }
}
