import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class GetSingleSpeciesParamsDto {
  @ApiProperty({
    description: 'ID of the species that you want to get.',
    example: 56,
  })
  id!: number
}
