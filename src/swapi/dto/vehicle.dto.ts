import { ApiProperty } from "@nestjs/swagger"

export class VehicleDto {
  @ApiProperty({
    description: `SWAPI vehicle's ID`,
    example: 23,
  })
  id!: number

  @ApiProperty({
    description: `SWAPI vehicle's name`,
    example: 'Snowspeeder',
  })
  name!: string

  @ApiProperty({
    description: `SWAPI vehicle's model`,
    example: 't-47 airspeeder',
  })
  model!: string
}