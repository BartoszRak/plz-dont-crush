import { Module } from '@nestjs/common'

import { AuthModule } from '@main/auth'
import { CacheModule } from '@main/cache'
import { SwapiModule } from '@main/swapi'

import { SpeciesController } from './species.controller'

@Module({
  imports: [SwapiModule, CacheModule, AuthModule],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
