import { TokenDto } from '@main/token'
import { UserDto } from '@main/user'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({
    required: true,
    type: UserDto,
  })
  user!: UserDto

  @ApiProperty({
    required: true,
    type: TokenDto,
  })
  token!: TokenDto
}
