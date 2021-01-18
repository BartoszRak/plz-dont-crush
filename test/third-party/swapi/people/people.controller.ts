import { Character } from '@main/swapi/ports/character'
import { SwapiPaginatedResponse } from '@main/swapi/ports/swapi-paginated-response.type'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { PeopleMockService } from './people-mock.service'

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleMockService: PeopleMockService) {}
  private readonly characterId = 1
  @Get(':id')
  async getSingleCharacter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    if (id !== this.characterId) {
      throw new NotFoundException()
    }
    return this.peopleMockService.getCharacter(this.characterId)
  }

  @Get()
  async getMultipleCharacters(): Promise<SwapiPaginatedResponse<Character[]>> {
    return {
      count: 1,
      next: null,
      previous: null,
      results: [this.peopleMockService.getCharacter(this.characterId)],
    }
  }
}
