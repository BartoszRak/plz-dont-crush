import { Module } from '@nestjs/common'
import { PeopleMockService } from './people-mock.service'
import { PeopleController } from './people.controller'

@Module({
  providers: [PeopleMockService],
  controllers: [PeopleController],
})
export class PeopleModule {}
