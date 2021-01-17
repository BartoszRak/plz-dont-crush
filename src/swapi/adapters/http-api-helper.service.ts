import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";

@Injectable()
export class HttpApiHelper {
  assertRequest(response: AxiosResponse, throwReason: string = 'Unknown error occured') {
    if (response.status !== 200) {
      throw new Error(throwReason)
    }
  }
}