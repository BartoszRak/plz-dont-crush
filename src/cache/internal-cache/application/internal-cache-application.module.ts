import { Module } from '@nestjs/common'

import { AdaptersModule } from '../adapters/adapters.module'
import { InternalCacheStoreFactory } from './internal-cache-store.factory'

@Module({
  imports: [AdaptersModule],
  providers: [InternalCacheStoreFactory],
  exports: [InternalCacheStoreFactory],
})
export class InternalCacheApplicationModule {}
