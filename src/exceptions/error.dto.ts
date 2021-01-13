import { ValidationError } from '@nestjs/common'

export class ErrorDto {
  public readonly statusCode: number
  public readonly timestamp: string
  public readonly path: string
  public readonly errorType: string
  public readonly message: string
  public readonly errorFields: ValidationError[]

  constructor({
    statusCode,
    timestamp,
    path,
    errorType,
    message,
    errorFields,
  }: {
    statusCode: number
    timestamp: string
    path: string
    errorType: string
    message: string
    errorFields: ValidationError[]
  }) {
    this.statusCode = statusCode
    this.timestamp = timestamp
    this.path = path
    this.errorType = errorType
    this.message = message
    this.errorFields = errorFields
  }
}
