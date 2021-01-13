import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpServer,
  HttpStatus,
  ValidationError,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Request, Response } from 'express'
import * as httpStatus from 'http-status'

import { isPropDefined, isRecord } from '@main/utils'

import { ErrorDto } from './error.dto'

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter
  implements ExceptionFilter {
  constructor(appReference: HttpServer) {
    super(appReference)
  }

  catch(error: Error | HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    if (this.isHttpException(error)) {
      this.catchHttpException(error, request, response)
    } else {
      this.catchError(error, host, request)
    }
  }

  private catchError(error: Error, host: ArgumentsHost, request: Request) {
    super.catch(error, host)
  }

  private async catchHttpException(
    exception: HttpException,
    request: Request,
    response: Response,
  ) {
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()

    let message: ValidationError[] | undefined | string
    if (
      isRecord(exceptionResponse) &&
      isPropDefined(exceptionResponse, 'message')
    ) {
      message = exceptionResponse.message as ValidationError[] | string
    }

    if (status === 400 && Array.isArray(message)) {
      const errorDto = new ErrorDto({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        errorType: httpStatus[HttpStatus.BAD_REQUEST],
        message: exception.message,
        errorFields: message,
      })
      response.status(status).send(errorDto)
      return
    }

    response.status(status).send(
      new ErrorDto({
        statusCode: status,
        timestamp: new Date().toISOString(),
        errorType: httpStatus[status] as string,
        message: exception.message,
        path: request.url,
        errorFields: [],
      }),
    )
  }

  private isHttpException(
    error: Error | HttpException,
  ): error is HttpException {
    return error instanceof HttpException
  }
}
