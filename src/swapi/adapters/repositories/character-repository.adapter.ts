import { HttpService, Inject, Injectable } from '@nestjs/common'

import { getRandomInt, isDefined } from '@main/utils'

import { Character, CharacterWithIds } from '../../ports/character'
import { CharacterRepositoryPort } from '../../ports/character-repository.port'
import { DataTransformerService } from '../data-transformer.service'
import { SwapiPaginatedResponse } from '../../ports/swapi-paginated-response.type'
import { SwapiConfig, swapiConfig } from '../swapi.config'
import { HttpApiHelper } from '../http-api-helper.service'

@Injectable()
export class CharacterRepositoryAdapter implements CharacterRepositoryPort {
  constructor(
    @Inject(swapiConfig.KEY) private readonly config: SwapiConfig,
    private readonly httpService: HttpService,
    private readonly dataTransformer: DataTransformerService,
    private readonly httpApiHelper: HttpApiHelper
  ) {}

  async getRandomCharacter(): Promise<CharacterWithIds> {
    const response = await this.httpService
      .get<SwapiPaginatedResponse<Character[]>>(`${this.config.baseUrl}/people`)
      .toPromise()
    this.httpApiHelper.assertRequest(response)
    const { count } = response.data
    const randomCharacterId = getRandomInt(1, count + 1)
    const character = await this.getCharacter(randomCharacterId)
    if (!isDefined(character)) {
      throw new Error('Unexpectedly random character not found.')
    }
    return character
  }

  async getCharacter(id: number): Promise<CharacterWithIds | undefined> {
    const response = await this.httpService
      .get<Character>(`${this.config.baseUrl}/people/${id}`)
      .toPromise()
    if (response.status === 404) {
      return undefined
    }
    if (response.status !== 200) {
      throw new Error('Unknown error when getting character.')
    }
    return this.dataTransformer.extendCharacter(response.data)
  }
}
