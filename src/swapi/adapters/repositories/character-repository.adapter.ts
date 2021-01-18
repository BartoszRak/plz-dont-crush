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
    const characters = await this.httpApiHelper.fetchThroughtPages<Character>(`${this.config.baseUrl}/people`)
    if (characters.length === 0) {
      throw new Error('Unexpectedly no characters found at all.')
    }
    const extendedCharacters = characters.map((character) => this.dataTransformer.extendCharacter(character))
    const randomCharacterIndex = getRandomInt(0, extendedCharacters.length - 1)
    return extendedCharacters[randomCharacterIndex]
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
