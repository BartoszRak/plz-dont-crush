import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { isLeft } from 'fp-ts/lib/Either'

import { Password } from '@main/shared'
import { ApiTag } from '@main/swagger/setup-swagger'
import { UserEmail } from '@main/user'

import { AuthService, SignInError, SignUpError } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@ApiTags(ApiTag.Auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description:
      'Creates an user account and returns his data and newly created authorization token.',
    type: AuthDto,
  })
  @Post('sign-up')
  async signUp(@Body() { email, password }: SignUpDto): Promise<AuthDto> {
    const signUpResult = await this.authService.signUp(
      new UserEmail(email),
      new Password(password),
    )
    if (isLeft(signUpResult)) {
      // Explanation: For future - this endpoint should never return an error
      // different than 400 to prevent resources scanning. But for now there is
      // no email-confirmation so there is no sense in implementing that.
      const exceptionByError: Record<SignUpError, HttpException> = {
        [SignUpError.AlreadyExists]: new ConflictException(
          'User with this email already exists.',
        ),
        [SignUpError.UnexpectedError]: new UnprocessableEntityException(
          'Unexpected error occured.',
        ),
      }
      throw exceptionByError[signUpResult.left.error.errorCode]
    }
    return signUpResult.right.toDto()
  }

  @ApiResponse({
    status: 201,
    description: 'Signs user in and returns his data and authorization token.',
    type: AuthDto,
  })
  @Post('sign-in')
  async signIn(@Body() { email, password }: SignInDto): Promise<AuthDto> {
    const signInResult = await this.authService.signIn(
      new UserEmail(email),
      new Password(password),
    )
    if (isLeft(signInResult)) {
      const invalidDataException = new BadRequestException(
        'Invalid email or password.',
      )
      const exceptionByError: Record<SignInError, HttpException> = {
        [SignInError.UserNotFound]: invalidDataException,
        [SignInError.PasswordInvalid]: invalidDataException,
      }
      throw exceptionByError[signInResult.left.error.errorCode]
    }
    return signInResult.right.toDto()
  }
}
