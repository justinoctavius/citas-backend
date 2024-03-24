import { Module } from '@nestjs/common';
import { UserServiceModule } from './services/users-service.module';

@Module({
  imports: [UserServiceModule],
  exports: [UserServiceModule],
})
export class UserModule {}
