import { SwapiCharacterDto } from '@main/swapi'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({
    description: `User's unique ID.`,
    required: true,
    example: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  })
  id!: string

  @ApiProperty({
    description: `User's email address.`,
    required: true,
    example: 'user@example.com',
  })
  email!: string

  @ApiProperty()
  swapiCharacter!: SwapiCharacterDto
}
