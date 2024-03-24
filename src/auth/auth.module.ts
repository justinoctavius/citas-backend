import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from 'src/common/services/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordlessService } from './passworless.service';
import { ConfigModule } from 'src/config/config.module';
import { Passwordless } from './entities/passwordless.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passwordless]),
    UserModule,
    TokenModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordlessService],
})
export class AuthModule {}
