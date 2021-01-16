import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Protect } from './auth'
import { ApiTag } from './swagger/setup-swagger'

@ApiTags(ApiTag.Health)
@Controller()
export class HealthController {
  @Get('/health')
  health(): string {
    return 'Healthy!'
  }

  @Protect()
  @Get('/protected-health')
  protectedHealth(): string {
    return 'Protected and healthy!'
  }
}
