import { ApiProperty } from "@nestjs/swagger";

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
}