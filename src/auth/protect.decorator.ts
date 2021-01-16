import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { isDefined } from '@main/utils'

export const Protect = (): MethodDecorator & ClassDecorator => (
  target: any,
  key?: string | symbol,
  descriptor?: TypedPropertyDescriptor<any>,
) => {
  if (isDefined(key) && isDefined(descriptor)) {
    UseGuards(AuthGuard())(target, key, descriptor)
  }
  UseGuards(AuthGuard())(target)
}
