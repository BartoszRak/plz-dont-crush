import { ErrorContext } from './error-context.type'

export class Failure<T extends string = string> {
  error: ErrorContext<T> & { additionalData?: unknown[] }
  constructor(code: T, message?: string, context?: unknown) {
    this.error = {
      errorCode: code,
      context: {
        msg: message,
        data: context,
      },
    }
  }
}
