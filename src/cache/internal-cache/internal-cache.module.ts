import { Module } from "@nestjs/common";
import { InternalCacheApplicationModule } from "./application/internal-cache-application.module";

@Module({
  imports: [InternalCacheApplicationModule],
  exports: [InternalCacheApplicationModule]
})
export class InternalCacheModule {}