import { INestApplication, ValueProvider } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'

import { AppModule } from '@main/app.module'
import { setupApplication } from '@main/setup-application'

import { DatabaseHelper } from './database-helper'

export type ProviderToOverride = ValueProvider<any>

export type Callback = (params: {
  application: INestApplication
  done: jest.DoneCallback
}) => void

export const init = (
  callback: Callback,
  overrideProviders: ProviderToOverride[] = [],
): void => {
  let databaseHelper: DatabaseHelper
  let application: NestExpressApplication

  beforeAll(async done => {
    databaseHelper = new DatabaseHelper()
    const mockedModule = Test.createTestingModule({
      imports: [AppModule],
    })
    const mockedModuleOverrided = overrideProviders.reduce(
      (accMockedModule, providerToOverride) => {
        const { useValue, provide } = providerToOverride
        return accMockedModule.overrideProvider(provide).useValue(useValue)
      },
      mockedModule,
    )
    const moduleFixture = await mockedModuleOverrided.compile()
    application = moduleFixture.createNestApplication<NestExpressApplication>()
    setupApplication(application)
    await application.init()

    databaseHelper.initRepositoriesAndConnection()
    await databaseHelper.cleanupRepositories()

    callback({
      application,
      done,
    })
  })

  beforeEach(async () => {
    await databaseHelper.cleanupRepositories()
  })

  afterAll(async () => {
    await databaseHelper.cleanupRepositories()
    await application.close()
    await databaseHelper.cleanupConnection()
  })
}
