import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as helmet from 'helmet'
import * as dotenv from 'dotenv'

import { GlobalExceptionFilter } from './exceptions'

dotenv.config()

export const setupApplication = (app: NestExpressApplication): void => {
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.disable('x-powered-by')
  if (process.env.NODE_ENV === 'production') {
    app.enableCors()
  }
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      // Explanation: Mostly used web app ports, like React. For local development purposes.
      origin: ['http://localhost:3001','http://localhost:3000'], 
    })
  }
  app.use(helmet())
  app.enable('trust proxy')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter))
}
