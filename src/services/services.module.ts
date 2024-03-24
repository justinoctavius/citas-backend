import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesServiceModule } from './services/services-service.module';
import { AuthGuardModule } from 'src/common/guards/auth/auth-guard.module';

@Module({
  imports: [ServicesServiceModule, AuthGuardModule],
  controllers: [ServicesController],
})
export class ServicesModule {}
