import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordlessDto } from './dtos/passwordless.dto';
import { PasswordlessValidateDto } from './dtos/passwordless-validate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('passwordless/send')
  async passwordlessSendOtp(@Body() passwordlessDto: PasswordlessDto) {
    return await this.authService.passwordlessSendOtp(passwordlessDto);
  }

  @Post('passwordless/validate')
  async passwordlessValidate(
    @Body() passwordlessValidateDto: PasswordlessValidateDto,
  ) {
    return await this.authService.passwordlessValidate(passwordlessValidateDto);
  }
}
