import { isDefined } from '@main/utils'
import { HttpService, Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { SwapiPaginatedResponse } from '../ports/swapi-paginated-response.type'

@Injectable()
export class HttpApiHelper {
  constructor(private readonly httpService: HttpService) {}

  assertResponse(
    response: AxiosResponse,
    throwReason: string = 'Unknown error occured',
  ) {
    if (response.status !== 200) {
      throw new Error(throwReason)
    }
  }

  async fetchThroughtPages<T extends object>(url: string): Promise<T[]> {
    return await this.fetchPageRedundantly<T>(url)
  }

  private async fetchPageRedundantly<T extends object>(
    url: string,
    accumulatedResults: T[] = [],
  ): Promise<T[]> {
    const response = await this.httpService
      .get<SwapiPaginatedResponse<T[]>>(url)
      .toPromise()
    this.assertResponse(response)
    const { data } = response
    return isDefined(data.next)
      ? await this.fetchPageRedundantly(data.next, [
          ...accumulatedResults,
          ...data.results,
        ])
      : data.results
  }
}
