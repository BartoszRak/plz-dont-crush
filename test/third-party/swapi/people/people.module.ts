import { Module } from '@nestjs/common'

import { PeopleMockService } from './people-mock.service'
import { PeopleController } from './people.controller'
import { CharacterProvider } from './character.provider'

@Module({
  controllers: [PeopleController],
  providers: [PeopleMockService, CharacterProvider],
  exports: [CharacterProvider],
})
export class PeopleModule {}
