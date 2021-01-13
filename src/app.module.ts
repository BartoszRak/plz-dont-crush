import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envsValidationSchema } from './config.envs'
import { databaseConfig, DatabaseConfig } from './database-config'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
