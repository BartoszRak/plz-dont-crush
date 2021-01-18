import { Module } from '@nestjs/common'

import { AuthModule } from '@main/auth'
import { CacheModule } from '@main/cache'
import { SwapiModule } from '@main/swapi'

import { VehiclesController } from './vehicles.controller'

@Module({
  imports: [SwapiModule, CacheModule, AuthModule],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
