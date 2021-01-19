import { Character } from '@main/swapi/ports/character'
import { SwapiPaginatedResponse } from '@main/swapi/ports/swapi-paginated-response.type'
import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { DataService } from '../data/data.service'
import { CHARACTER_TOKEN } from './character.provider'

@Controller('people')
export class PeopleController {
  constructor(
    @Inject(CHARACTER_TOKEN) private readonly character: Character,
    private readonly dataService: DataService,
  ) {}
  
  @Get(':id')
  async getSingleCharacter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Character> {
    if (id !== this.dataService.extractIdFromUrl(this.character.url)) {
      throw new NotFoundException()
    }
    return this.character
  }

  @Get()
  async getMultipleCharacters(): Promise<SwapiPaginatedResponse<Character[]>> {
    return {
      count: 1,
      next: null,
      previous: null,
      results: [this.character],
    }
  }
}
