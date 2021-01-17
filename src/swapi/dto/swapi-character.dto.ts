import { ApiProperty } from '@nestjs/swagger'

export class SwapiCharacterDto {
  @ApiProperty({
    description: `SWAPI character's ID`,
    example: 15,
  })
  id!: number

  @ApiProperty({
    description: `SWAPI character's full name.`,
    example: 'George Patton',
  })
  name!: string

  @ApiProperty({
    description: `ID of SWAPI planet assigned to the user's SWAPI character as homeworld.`,
    example: 34,
  })
  planetId!: number

  @ApiProperty({
    description: `ID of SWAPI films assigned to the user's SWAPI character.`,
    example: [23, 52, 1, 67],
  })
  filmsIds!: number[]

  @ApiProperty({
    description: `ID of SWAPI species assigned to the user's SWAPI character.`,
    example: [2, 15, 95],
  })
  speciesIds!: number[]

  @ApiProperty({
    description: `ID of SWAPI vehicles assigned to the user's SWAPI character.`,
    example: [2, 13],
  })
  vehiclesIds!: number[]

  @ApiProperty({
    description: `ID of SWAPI starships assigned to the user's SWAPI character.`,
    example: [12, 74, 2],
  })
  starshipsIds!: number[]
}
