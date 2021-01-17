import { isDefined } from "@main/utils";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheDataManipulatorService {

  isCacheableValue(value: unknown): boolean {
    return isDefined(value)
  }

  prepareJson(value: any): string {
    return  JSON.stringify(value) || '"undefined"'
  }

  readJson<T>(str: string): T | undefined {
    try {
      return JSON.parse(str)
    } catch(err) {
      return undefined
    }
  }
}