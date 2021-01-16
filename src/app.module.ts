import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'

import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { envsValidationSchema } from './config.envs'
import { CryptoModule } from './crypto'
import { databaseConfig, DatabaseConfig } from './database-config'
import { HealthController } from './health.controller'
import { SwapiModule } from './swapi'
import { TokenModule } from './token'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object(envsValidationSchema),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (config: DatabaseConfig) => config,
      inject: [databaseConfig.KEY],
    }),
    TokenModule,
    CryptoModule,
    AuthModule,
    UserModule,
    SwapiModule,
  ],
  controllers: [HealthController],
  providers: [AppService],
})
export class AppModule {}
