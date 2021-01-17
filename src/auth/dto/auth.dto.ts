import { TokenDto } from '@main/token'
import { UserDto } from '@main/user'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty()
  user!: UserDto

  @ApiProperty()
  token!: TokenDto
}
