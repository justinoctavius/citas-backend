import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
