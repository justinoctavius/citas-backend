import { Module } from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { TokenModule } from 'src/common/services/token/token.module';
import { UserServiceModule } from 'src/users/services/users-service.module';

@Module({
  imports: [TokenModule, UserServiceModule],
  providers: [TokenGuard],
  exports: [TokenGuard, TokenModule, UserServiceModule],
})
export class AuthGuardModule {}
