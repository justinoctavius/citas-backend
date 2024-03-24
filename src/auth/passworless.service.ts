import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Passwordless } from './entities/passwordless.entity';
import { Repository } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import { generateOtp } from 'src/common/utils/otp.util';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PasswordlessService {
  private expireIn: number;

  constructor(
    @InjectRepository(Passwordless)
    private readonly passwordlessRepository: Repository<Passwordless>,
    private readonly configService: ConfigService,
  ) {
    this.expireIn = +this.configService.get('PASSWORDLESS_OTP_EXPIRE_IN_SEC');
  }

  async sendOtp(email: string) {
    //TODO: send otp to user email

    return await this.createOtp(email);
  }

  async verify({ email, otp }: { email: string; otp: string }) {
    const otpFounded = await this.passwordlessRepository.findOne({
      where: { otp, email },
    });

    if (!otpFounded || otpFounded?.expireAt?.getTime() <= Date.now()) {
      return false;
    }

    await this.passwordlessRepository.delete({
      id: otpFounded.id,
    });

    return true;
  }

  private async createOtp(email: string) {
    const otp = generateOtp();

    await this.passwordlessRepository.delete({ email });

    const passwordlessOtp = this.passwordlessRepository.create({
      otp: otp,
      email,
      expireIn: this.expireIn,
      expireAt: this.getExpireAt(),
    });

    await this.passwordlessRepository.save(passwordlessOtp);

    return otp;
  }

  private getExpireAt() {
    return new Date(this.expireIn * 1000 + Date.now());
  }
}
