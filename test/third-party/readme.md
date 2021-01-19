# 3rd parties for e2e
## Inroduction
In the case of need to test the app with e2e tests we had to think about - what to do with 3rd parties (external API's for example) during those tests. It is not so awesome to use real external service when CI or any developer in the team runs e2e tests. Solution for that is - creating own mock-like implementation of external service that our app uses.

## How is it done?
We have a directory in our e2e tests directory (`<root>/test/third-party`) where we put our mocked implementation of external services.Every mocked implementation is standalone NestJS app that runs concurrently to our app during tests. If we are writing an e2e test that is going to use an area of our app where external service is used we should init and shut down our mocked external api in that test.

Because of our mocked external services should probably have no state do not use `beforeEach()` and `afterEach()` to do not increase tests execution time without need. Check out `beforeAll()` and `afterAll()`

## How to add new mocked external service?
### 1. Configuration
First of all that is obvious that we are going to run our mocked service locally same as our app but we have to think about a port on which this mocked service is going to run. 

It is totally up to you which one will you choose but remember about including chosen port into [<root>/test/third-party/third-party-port.ts](./third-party-port.ts) file. This rule should prevent using the same port by developers twice. Also it makes using those ports in code easier because with "enum rule" applied properly there is only one source of truth (enum) not bunch of sources (inline manually placed ports in different files).

And here is how `third-party-port.ts` file looks like. So we have to add:
```ts
export enum ThirdPartyPort {
  MyMockedApi = 3015
}
```
### 2. Directory
To keep `third-party` directory clean just add new subdirectory in there for you mocked service.

For example: `.../third-party/my-mocked-api`

### 3. Service
Every mocked service shouldn't be so different to our app. Example `main.ts` file of our mocked service could like like:
```ts
export async function bootstrapMyMockedApi() {
  // Call and wait to ensure port is free
  await waitUntilFree(ThirdPartyPort.MyMockedApi)
  // Create an app
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // To prevent logger spam during test run.
    logger: false, 
  })
  // Delegate additional setup. Like pipelines, middlewares etc.
  setupApplication(app)
  // Listen to an our prepared free port
  await app.listen(ThirdPartyPort.Swapi)
  // Return app reference to give possibility to use it in test
  return app
}
```
After our mocked service implementation is ready to go we should additionally re-export our bootstrap method by adding
```ts
export { bootstrapMyMockedApi } from './swapi/main'
```
to this [<root>/test/third-party/index.ts](./index.ts) file.
### 4. Usage in test
At the end we have to start and close our mocked service in test file.
```ts
import { INestApplication } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { bootstrapMyMockedApi, ThirdPartyPort } from './third-party'

// We call it to have access to the envs
dotenv.config()

// We switch our app to use mocked external service url
process.env.MY_MOCKED_API_BASE_URL = `http://localhost:${ThirdPartyPort.MyMockedApi}`

let myMockedApiApp: INestApplication

describe('Example test (e2e)', () => {
  beforeAll(async () => {
    // We don't have to wait for free port - bootstrap() does it.
    myMockedApiApp = await bootstrapMyMockedApi()
  })

  afterAll(async () => {
    // Close after all tests are done
    await myMockedApiApp.close() 
  })
})
```
