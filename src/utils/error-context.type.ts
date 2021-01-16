export interface ErrorContext<T extends string = string> {
  errorCode: T
  context?: {
    msg?: string
    data?: any
  }
}
