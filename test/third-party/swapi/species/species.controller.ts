import { Species } from '@main/swapi/ports/species'
import { SwapiPaginatedResponse } from '@main/swapi/ports/swapi-paginated-response.type'
import { isDefined } from '@main/utils'
import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { DataService } from '../data/data.service'
import { SPECIES_TOKEN } from './species.provider'

@Controller('species')
export class SpeciesController {
  constructor(
    @Inject(SPECIES_TOKEN) private readonly species: Species[],
    private readonly dataService: DataService,
  ) {}

  @Get(':id')
  async getSingleSpecies(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Species> {
    const foundSpecies = this.species.find(
      ({ url }) => this.dataService.extractIdFromUrl(url) === id,
    )
    if (!isDefined(foundSpecies)) {
      throw new NotFoundException()
    }
    return foundSpecies
  }

  @Get()
  async getMultipleVehicles(): Promise<SwapiPaginatedResponse<Species[]>> {
    return {
      count: this.species.length,
      next: null,
      previous: null,
      results: this.species,
    }
  }
}
