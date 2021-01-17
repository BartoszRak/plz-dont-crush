import { ApiProperty } from '@nestjs/swagger'

export class SwapiSpeciesDto {
  @ApiProperty({
    description: `SWAPI species's ID`,
    example: 15,
  })
  id!: number

  @ApiProperty({
    description: `SWAPI species's name`,
    example: 'Wookie',
  })
  name!: string
}