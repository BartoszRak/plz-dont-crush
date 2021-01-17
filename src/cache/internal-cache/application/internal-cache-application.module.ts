import { Module } from '@nestjs/common'

import { AdaptersModule } from '../adapters/adapters.module'
import { CacheDataManipulatorService } from './cache-data-manipulator.service'
import { InternalCacheStoreFactory } from './internal-cache-store.factory'

@Module({
  imports: [AdaptersModule],
  providers: [CacheDataManipulatorService, InternalCacheStoreFactory],
  exports: [InternalCacheStoreFactory],
})
export class InternalCacheApplicationModule {}
