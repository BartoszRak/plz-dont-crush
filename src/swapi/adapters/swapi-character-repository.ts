import { HttpService, Inject, Injectable } from '@nestjs/common'

import { getRandomInt, isDefined } from '@main/utils'

import { Character, CharacterWithIds } from '../ports/character'
import { CharacterRepository } from '../ports/character-repository'
import { DataTransformerService } from './data-transformer.service'
import { SwapiPaginatedResponse } from './swapi-paginated-response'
import { SwapiConfig, swapiConfig } from './swapi.config'

@Injectable()
export class SwapiCharacterRepository implements CharacterRepository {
  constructor(
    @Inject(swapiConfig.KEY) private readonly config: SwapiConfig,
    private readonly httpService: HttpService,
    private readonly dataTransformer: DataTransformerService,
  ) {}

  async getRandomCharacter(): Promise<CharacterWithIds> {
    const response = await this.httpService
      .get<SwapiPaginatedResponse<Character[]>>(`${this.config.baseUrl}/people`)
      .toPromise()
    if (response.status !== 200) {
      throw new Error('Unknown error occured when getting random characte.r')
    }
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
    return this.dataTransformer.transformCharacter(response.data)
  }
}
