import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { Injectable } from '@nestjs/common';
import { SignResponse } from './interfaces/sign-reponse';

@Injectable()
export class TokenService {
  private readonly secret: string;
  private readonly expiresIn: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.secret = process.env.TOKEN_SECRET;
    this.expiresIn = +process.env.TOKEN_EXPIRES_IN_SEC;
  }

  sign(payload: any): SignResponse {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: this.expiresIn,
    });

    return {
      accessToken,
      expiresIn: this.expiresIn,
      expiresAt: Date.now() + this.expiresIn * 1000,
      tokenId: payload,
    };
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.secret,
    });
  }
}
