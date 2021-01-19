import { Injectable } from '@nestjs/common'

@Injectable()
export class DataService {
  extractIdFromUrl(url: string): number {
    const splittedUrl = url.split('/')
    return Number(splittedUrl[splittedUrl.length - 2])
  }
}
