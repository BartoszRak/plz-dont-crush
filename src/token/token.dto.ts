import { ApiProperty } from '@nestjs/swagger'

export class TokenDto {
  @ApiProperty({
    description: 'Token required for protected endpoints',
    example: 'B1q2hUEKmeVp9zWepx9cnp',
  })
  value!: string
}
