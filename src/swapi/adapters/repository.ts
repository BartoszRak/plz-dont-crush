import { getRandomInt, isDefined } from '@main/utils'
import { HttpService, Inject, Injectable } from '@nestjs/common'
import { Character } from '../ports/character'
import { SwapiRepository } from '../ports/swapi-repository'
import { WithId } from '../ports/with-id.type'
import { DataTransformerService } from './data-transformer.service'
import { SwapiPaginatedResponse } from './swapi-paginated-response'
import { SwapiConfig, swapiConfig } from './swapi.config'

@Injectable()
export class Repository implements SwapiRepository {
  constructor(
    @Inject(swapiConfig.KEY) private readonly config: SwapiConfig,
    private readonly httpService: HttpService,
    private readonly dataTransformer: DataTransformerService,
  ) {}

  async getRandomCharacter(): Promise<WithId<Character>> {
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
    return this.dataTransformer.addId(character)
  }

  async getCharacter(id: number): Promise<WithId<Character> | undefined> {
    const response = await this.httpService
      .get<Character>(`${this.config.baseUrl}/people/${id}`)
      .toPromise()
    if (response.status === 404) {
      return undefined
    }
    if (response.status !== 200) {
      throw new Error('Unknown error when getting character.')
    }
    return this.dataTransformer.addId(response.data)
  }
}
