import { Injectable } from '@nestjs/common'

@Injectable()
export class DataTransformerService {
  addId<Data extends object & { url: string }>(
    data: Data,
  ): Data & { id: number } {
    return {
      ...data,
      id: this.extractIdFromUrl(data.url),
    }
  }

  private extractIdFromUrl(url: string): number {
    const splittedUrl = url.split('/')
    return Number(splittedUrl[splittedUrl.length - 2])
  }
}
