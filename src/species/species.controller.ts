import {
  CacheInterceptor,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common'

import { Protect } from '@main/auth'
import { AuthorizedRequest } from '@main/shared'
import { SpeciesManager, SwapiSpeciesId } from '@main/swapi'
import { isDefined } from '@main/utils'

import { SwapiSpeciesDto } from '@main/swapi/dto/swapi-species.dto'
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiTag } from '@main/swagger/setup-swagger'
import { UserSpecificCacheInterceptor } from '@main/cache'

@ApiTags(ApiTag.Species)
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesManager: SpeciesManager) {}

  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Gets a species with specified ID.',
    type: SwapiSpeciesDto,
  })
  @UseInterceptors(CacheInterceptor)
  @Protect()
  @Get(':id')
  async getSingleSpecies(
    @Req() { user }: AuthorizedRequest,
    @Param('id') id: number,
  ): Promise<SwapiSpeciesDto> {
    if (!user.hasPermissionsToSpecies(id)) {
      throw new ForbiddenException('Missing permissions.')
    }
    const species = await this.speciesManager.getSpeciesById(
      new SwapiSpeciesId(id),
    )
    if (!isDefined(species)) {
      throw new NotFoundException(
        'Species that you are looking for has not been found.',
      )
    }
    return species.toDto()
  }

  @ApiResponse({
    status: 200,
    description: `Gets all species assigned to user's character.`,
    type: SwapiSpeciesDto,
    isArray: true,
  })
  @UseInterceptors(UserSpecificCacheInterceptor)
  @Protect()
  @Get()
  async getMySpecies(
    @Req() { user }: AuthorizedRequest,
  ): Promise<SwapiSpeciesDto[]> {
    const species = await this.speciesManager.getMultipleSpeciesByIds(
      user.getAssignedCharacterSpeciesIds(),
    )
    return species.map(domainSpecies => domainSpecies.toDto())
  }
}
