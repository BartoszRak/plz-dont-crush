import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
  @ApiProperty({
    description: `User's email address.`,
    required: true,
    example: 'user@example.com',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    description: `User's password.`,
    required: true,
    example: '789#$%abc',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string
}
