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
import { ApiParam, ApiResponse } from '@nestjs/swagger'

import { Protect } from '@main/auth'
import { UserSpecificCacheInterceptor } from '@main/cache'
import { AuthorizedRequest } from '@main/shared'
import { VehicleDto, VehicleId, VehiclesManager } from '@main/swapi'
import { isDefined } from '@main/utils'

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesManager: VehiclesManager) {}

  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Gets a vehicle with specified ID.',
    type: VehicleDto,
  })
  @UseInterceptors(CacheInterceptor)
  @Protect()
  @Get(':id')
  async getSingleVehicle(
    @Req() { user }: AuthorizedRequest,
    @Param('id') id: number,
  ): Promise<VehicleDto> {
    if (!user.hasPermissionsToVehicle(id)) {
      throw new ForbiddenException('Missing permissions.')
    }
    const vehicles = await this.vehiclesManager.getVehicleById(
      new VehicleId(id),
    )
    if (!isDefined(vehicles)) {
      throw new NotFoundException(
        'Vehicle that you are looking for has not been found.',
      )
    }
    return vehicles.toDto()
  }

  @ApiResponse({
    status: 200,
    description: `Gets all vehicles assigned to user's character.`,
    type: VehicleDto,
    isArray: true,
  })
  @UseInterceptors(UserSpecificCacheInterceptor)
  @Protect()
  @Get()
  async getMyVehicles(
    @Req() { user }: AuthorizedRequest,
  ): Promise<VehicleDto[]> {
    const vehicles = await this.vehiclesManager.getMultipleVehiclesByIds(
      user.getAssignedCharacterVehiclesIds(),
    )
    return vehicles.map(domainVehicle => domainVehicle.toDto())
  }
}
