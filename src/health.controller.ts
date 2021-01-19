import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { Protect } from './auth'
import { ApiTag } from './swagger/setup-swagger'

@ApiTags(ApiTag.Health)
@Controller()
export class HealthController {
  @Get('/health')
  health(): string {
    return 'Healthy!'
  }

  @ApiBearerAuth()
  @Protect()
  @Get('/protected-health')
  protectedHealth(): string {
    return 'Protected and healthy!'
  }
}
