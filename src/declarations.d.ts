import { Query } from './utils/query'
import { Command } from './utils/command'
import { IQueryHandler } from '@nestjs/cqrs'

declare module '@nestjs/cqrs/dist/query-bus' {
  export interface QueryBus {
    execute<X>(query: Query<X>): Promise<X>
  }

  export type IInferringQueryHandler<
    QueryType extends Query<unknown>
  > = QueryType extends Query<infer ResultType>
    ? IQueryHandler<QueryType, ResultType>
    : never
}

declare module '@nestjs/cqrs/dist/command-bus' {
  export interface CommandBus {
    execute<X>(command: Command<X>): Promise<X>
  }

  export type IInferringCommandHandler<
    CommandType extends Command<unknown>
  > = CommandType extends Command<infer ResultType>
    ? {
        execute(command: CommandType): Promise<ResultType>
      }
    : never
}
