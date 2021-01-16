import { ICommand } from '@nestjs/cqrs'

export class Command<T> implements ICommand {
  private $resultType!: T
}
