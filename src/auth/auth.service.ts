import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/common/services/token/token.service';

import { UserService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { PasswordlessDto } from './dtos/passwordless.dto';
import { PasswordlessService } from './passworless.service';
import { PasswordlessValidateDto } from './dtos/passwordless-validate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly passwordlessService: PasswordlessService,
  ) {}

  async passwordlessSendOtp({ email }: PasswordlessDto) {
    const user = await this.userService.createIfNotExists({ email });
    await this.passwordlessService.sendOtp(user);
  }

  async passwordlessValidate({ otp, email }: PasswordlessValidateDto) {
    const user = await this.userService.findByEmail({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('otp invalid');
    }

    const isValid = await this.passwordlessService.verify({
      userId: user.id,
      otp,
    });

    if (!isValid) {
      throw new UnauthorizedException('otp invalid');
    }

    await this.userService.createIfNotExists({ email });

    const payload = this.buildTokenPayload(user);

    const signResponse = await this.tokenService.sign(payload);

    return { ...signResponse };
  }

  private buildTokenPayload(user: User) {
    return {
      email: user.email,
      id: user.id,
    };
  }
}
