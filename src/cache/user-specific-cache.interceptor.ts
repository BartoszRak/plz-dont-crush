import {
  CacheInterceptor,
  CACHE_KEY_METADATA,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'

import { AuthorizedRequest } from '@main/shared'
import { isDefined, NullableByKey } from '@main/utils'

@Injectable()
export class UserSpecificCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const {
      user,
    }: NullableByKey<
      AuthorizedRequest,
      'user'
    > = context.switchToHttp().getRequest()
    if (!isDefined(user)) {
      throw new Error(
        `User specific cache cannot be used on routes that don't require authorization. 
        User has to be included in request. (request.user)`,
      )
    }
    const httpAdapter = this.httpAdapterHost.httpAdapter
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    )
    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata
    }
    const request = context.getArgByIndex(0)
    if (httpAdapter.getRequestMethod(request) !== 'GET') {
      return undefined
    }
    const key = `${user.id.value}#${httpAdapter.getRequestUrl(request)}`
    return
  }
}
